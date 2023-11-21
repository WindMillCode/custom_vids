from manager import WeaviateManager


schema_name = "Article"
app = WeaviateManager(
  client_url="https://weaviate-cluster-0-2glexaxw.weaviate.network",
  weaviate_api_key="MVnKpYzxaNgybka6zcjJUir2Aa0X4PRTFYSt",
  cohere_api_key="ofYevOiGkaZrRIkuunhetQ6UJRqKEl6nHjYn0hcR",
  openai_api_key="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"
)
app.create_database_schema(schema_name,"Wiki Article")
app.get_schema()
app.import_data_into_weaviate("wiki_simple_100k.parquet")
print(app.df.sample(10))
print(app.df['emb'][0].shape)
app.test_data_was_imported_into_weaviate(schema_name)



app.keyword_search({
  "path": ["title"],
  "operator": "Like",
  "valueString": "Dog"
})

app.semantic_search('cutest animals')
app.semantic_search("a programming language used for machine learning")

app.semantic_search("महान फिल्में")
app.semantic_search("مکان های تعطیلات")
app.semantic_search("很棒的电影")

app.mix_of_keyword_and_semantic_search("The Dark Knight")
app.mix_of_keyword_and_semantic_search("The Dark Knight",1)

app.generative_search("Write me some interview questions I can ask {title} here is some information about them {text}")
app.generative_search( "Tell me a story where these people {title} fight each other, here's some information about them {text}",5)
app.generative_search("Which of these players in {text} is the most accomplished. Choose atleast one",15)
app.generative_search("Explain why these {text} results are all similar ",15)

# app.clear_db()
