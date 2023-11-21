# MLOPS WEAVIATE TUTORIAL PART 2

* after this lab your project shoud look like final
* if issues restart lab from start


## Install the Dependencies
```ps1
python -m venv weaviate-env
.\weaviate-env\Scripts\activate
pip install weaviate-client pandas pyarrow Pillow pygame opencv-python-headless pillow opencv-python tqdm
```


## Connect to Weaviate cloud
* make a weaviate account [here](https://console.weaviate.cloud/)
* make a cohere account [here](https://dashboard.cohere.com/welcome/register)
* make a chatgpt account [here](https://chat.openai.com/auth/login?ref=upstract.com)

__FILE__ start/manager.py
```py
import os
import weaviate
import json

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
```

__FILE__ start/run.py
```py
app = WeaviateManager(
  client_url=">> YOUR client_url HERE <<",
  weaviate_api_key=">> YOUR weaviate_api_key HERE <<",
  cohere_api_key=">> YOUR cohere_api_key HERE <<",
  openai_api_key=">> YOUR openai_api_key HERE <<"
)
```

# Setup

## Create database schema

__FILE__ start/manager.py
```py
  def create_database_schema(self,name,desc):
    article_schema = {
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

    # add the schema
    #client.schema.delete_all()
    self.client.schema.create_class(article_schema)
		print("The schema has been created")

```

__FILE__ start/run.py
```py
app.create_database_schema("Article","Wiki Article")

```

## Print the schema
__FILE__ start/manager.py
```py
  def get_schema(self):
    return self.client.schema.get()
```

__FILE__ start/run.py
```py
val = app.get_schema()
```

## import data into weaviate

__FILE__ start/manager.py
```py
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

            batch.add_data_object(properties, "Article", None, vector)
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

```


__FILE__ start/run.py
```py
app.import_data_into_weaviate("wiki_simple_100k.parquet")
print(app.df.sample(10))
print(app.df['emb'][0].shape)
app.test_data_was_imported_into_weaviate(schema_name)
```


# Performing Searches

## Classic (Key)Word search

__FILE__ start/manager.py
```py
  def keyword_search(self,filter_obj):
    query_result = (
      self.client.query
      .get("Article", ["title", "text","wiki_id"])
      .with_where(filter_obj)
      .with_limit(3)
      .do()
    )

    print(json.dumps(query_result, indent=2))
```

__FILE__ start/run.py
```py
app.keyword_search({
  "path": ["title"],
  "operator": "Like",
  "valueString": "Dog"
})
```

##  semantic search
*

__FILE__ start/manager.py
```py
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
          .get("Article", properties)
          .with_near_text(nearText)
          .with_limit(3)
          .do()
      )

      result = response['data']['Get']['Article']
      self.print_result(result)
      return result
```

__FILE__ start/run.py
```py
app.semantic_search('cutest animals')
app.semantic_search("a programming language used for machine learning")
# #try to figure out what I am asking
app.semantic_search("महान फिल्में")
app.semantic_search("مکان های تعطیلات")
app.semantic_search("很棒的电影")

```






# Keyword and sematntic search

__FILE__ start/manager.py
```py
  def mix_of_keyword_and_semantic_search(self,alpha,query):
    response = (
        self.client.query
        .get("Article", ["title", "text"])
        .with_hybrid(
            query,
            alpha
        )
        #.with_additional(["score", "explainScore"])
        .with_limit(3)
        .do()
    )

    print(json.dumps(response, indent=2))
```

__FILE__ start/run.py
```py

app.mix_of_keyword_and_semantic_search("The Dark Knight")
# try to guess what alpha does
app.mix_of_keyword_and_semantic_search("The Dark Knight",1)

```


# Generative search
* basically pefrom a vector seach for the related information then prompt chat gpt with the related informatio
__FILE__ start/manager.py
```py
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


```

__FILE__ start/run.py
```py
app.generative_search("Write me some interview questions I can ask {title} here is some information about them {text}")
app.generative_search( "Tell me a story where these people {title} fight each other, here's some information about them {text}",5)
app.generative_search("Which of these players in {text} is the most accomplished. Choose atleast one",15)
app.generative_search("Explain why these {text} results are all similar ",15)
```


# To clear the db
__FILE__ start/manager.py
```py
def clear_db(self):
	self.client.schema.delete_all()
```

__FILE__ start/run.py
```py
app.clear_db()
```
