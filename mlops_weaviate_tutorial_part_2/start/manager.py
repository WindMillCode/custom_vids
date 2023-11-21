import os
import weaviate
import json
import pandas as pd
from tqdm import tqdm


SCHEMA_NAME = "Article"
class WeaviateManager():


  def print_result(self,result):
    for item in result:
        print(f"\033[95m{item['title']} ({item['views']}) {item['_additional']['distance']}\033[0m")
        print(f"\033[4m{item['url']}\033[0m")
        print(item['text'])
        print()


