import os
import weaviate
import json
import pandas as pd
from tqdm import tqdm


SCHEMA_NAME = "Article"
class WeaviateManager():

  def __init__(self,
               client_url,
               weaviate_api_key,
               cohere_api_key,
               openai_api_key) -> None:
    self.client = weaviate.Client(
      url=client_url,
      auth_client_secret= weaviate.auth.AuthApiKey(api_key=weaviate_api_key),
      additional_headers={
          "X-Cohere-Api-Key": cohere_api_key,
          "X-OpenAI-Api-Key": openai_api_key
      }
    )


  def create_database_schema(self,name,desc):

    target_schema = {
        "class": name,
        "description": desc,
        "vectorizer": "text2vec-cohere",#multi-lingual
        "moduleConfig": {
            "text2vec-cohere": {
                "model": "multilingual-22-12",
                "truncate": "RIGHT"
            },
            "generative-openai":{},
        },
        "vectorIndexConfig": {
            "distance": "dot"
        },
        "properties": [
        {
            "name": "text",
            "dataType": [ "text" ],
            "description": "Article body",
            "moduleConfig": {
                "text2vec-cohere": {
                    "skip": False,
                    "vectorizePropertyName": False
                }
            }
        },
        {
            "name": "title",
            "dataType": [ "string" ],
            "moduleConfig": { "text2vec-cohere": { "skip": True } }
        },
        {
            "name": "url",
            "dataType": [ "string" ],
            "moduleConfig": { "text2vec-cohere": { "skip": True } }
        },
        {
            "name": "wiki_id",
            "dataType": [ "int" ],
            "moduleConfig": { "text2vec-cohere": { "skip": True } }
        },
        {
            "name": "views",
            "dataType": [ "number" ],
            "moduleConfig": { "text2vec-cohere": { "skip": True } }
        },
        ]
    }


    try:
      self.client.schema.create_class(target_schema)
      print("The schema has been created")
    except BaseException as e:
      None


  def get_schema(self):
    print(json.dumps(self.client.schema.get(), indent=2))


  def import_data_into_weaviate(self,parquet_file):
    self.df = df = pd.read_parquet(parquet_file)
    self.client.batch.configure(
      batch_size=200,
      dynamic=True,
      timeout_retries=3,
    )

    object_length = 10000
    data = df[:object_length] # make sure it is not more than 100k objects

    counter=0

    with self.client.batch as batch:
        rows = data.iterrows()
        for idx, item in tqdm(rows,total=(object_length)):
            # print update message every 100 objects


            properties = {
            "text": item["text"],
            "title": item["title"],
            "url": item["url"],
            "views": item["views"],
            "wiki_id": item["wiki_id"]
            }

            vector = item["emb"]

            batch.add_data_object(properties, SCHEMA_NAME, None, vector)
            counter = counter+1
        print(f"Import {counter} / {len(data)}")

    print("Import complete")


  def test_data_was_imported_into_weaviate(self,schema_name):
    result = (
        self.client.query.aggregate(schema_name)
        .with_fields("meta { count }")
        .do()
    )
    print("Object count: ", result["data"]["Aggregate"][schema_name])

  def clear_db(self):
    self.client.schema.delete_all()

  def keyword_search(self,filter_obj):
    query_result = (
      self.client.query
      .get(SCHEMA_NAME, ["title", "text","wiki_id"])
      .with_where(filter_obj)
      .with_limit(3)
      .do()
    )

    print(json.dumps(query_result, indent=2))

  def semantic_search(self,query):
      nearText = {
          "concepts": [query], # example from earlier -> 'kitten'
          # "distance": -139.0,
      }

      properties = [
          "text", "title", "url", "views",
          "_additional {distance}"
      ]

      response = (
          self.client.query
          .get(SCHEMA_NAME, properties)
          .with_near_text(nearText)
          .with_limit(3)
          .do()
      )

      result = response['data']['Get']['Article']
      self.print_result(result)
      return result

  def print_result(self,result):
    for item in result:
        print(f"\033[95m{item['title']} ({item['views']}) {item['_additional']['distance']}\033[0m")
        print(f"\033[4m{item['url']}\033[0m")
        print(item['text'])
        print()


  def mix_of_keyword_and_semantic_search(self,query,alpha=0):
    response = (
        self.client.query
        .get(SCHEMA_NAME, ["title", "text"])
        .with_hybrid(
            query,
            alpha
        )
        #.with_additional(["score", "explainScore"])
        .with_limit(3)
        .do()
    )

    print(json.dumps(response, indent=2))

  def generative_search(self,prompt,limit=3):
    result = (
      self.client.query
      .get("Article", ["title","text"])
      .with_generate(single_prompt=prompt) # Pass in each obj 1 at a time
      .with_near_text({
        "concepts": ["famous basketball players"]
      })
      .with_limit(limit)
    ).do()
    print("Generated Text:\n" + result['data']['Get']['Article'][0]['_additional']['generate']['singleResult']+"\n")
    [print(result['data']['Get']['Article'][i]['title']) for i in range(len(result['data']['Get']['Article']))]
