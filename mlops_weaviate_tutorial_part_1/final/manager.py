import base64
import threading
import time
from tkinter import Image
from video_player_app import  play_video
import weaviate
import os
import json
import pygame
import cv2

DEFAULT_SCHEMA_NAME = "Animals"
class WeaviateManager:


  def __init__(self, client_url):
      self.client = weaviate.Client(
          url=client_url,
      )
      while True:
        if self.client.is_ready():
            break
        time.sleep(1000)

  def create_schema(self, schema_name=DEFAULT_SCHEMA_NAME):
      if not self.client.schema.exists(schema_name):
        animals = {
          "classes": [
            {
              "class": schema_name,
              "vectorizer": "multi2vec-bind",
              "moduleConfig": {
                "multi2vec-bind": {
                  "textFields": ["name"],
                  "imageFields": ["image"],
                  "audioFields": ["audio"],
                  "videoFields": ["video"],
                }
              },
            }
          ]
        }
        self.client.schema.create(animals)

  def _to_base_64(self,path):
    with open(path, 'rb') as file:
        return base64.b64encode(file.read()).decode('utf-8')

  def import_images(self,image_list,batch_size=3,schema_name=DEFAULT_SCHEMA_NAME):
    self.client.batch.configure(batch_size)
    with self.client.batch as batch:
      for name in image_list:
        print(f"Adding {name}")

        # Build the path to the image file
        path = "./source/image/" + name

        # Object to store in Weaviate
        properties = {
            "name": name,
            "path": path,
            "image": self._to_base_64(path), # Weaviate will use the base64 representation of the file to generate a vector.
            "mediaType": "image"
        }

        # Add the object to Weaviate
        self.client.batch.add_data_object(properties, schema_name)

  def import_audio(self,target_list,batch_size=1,schema_name=DEFAULT_SCHEMA_NAME):
    self.client.batch.configure(batch_size)  # Load images in batches of 1, as these might be big files
    with self.client.batch as batch:

        for name in target_list:
            print(f"Adding {name}")

            # Build the path to the image file
            path = "./source/audio/" + name

            # Object to store in Weaviate
            properties = {
                "name": name,
                "path": path,
                "audio": self._to_base_64(path), # Weaviate will use the base64 representation of the file to generate a vector.
                "mediaType": "audio"
            }

            # Add the object to Weaviate
            self.client.batch.add_data_object(properties, schema_name)


  def import_video(self,target_list,batch_size=1,schema_name=DEFAULT_SCHEMA_NAME):
    self.client.batch.configure(batch_size)  # Load images in batches of 1, as these might be big files
    with self.client.batch as batch:

        for name in target_list:
            print(f"Adding {name}")

            # Build the path to the image file
            path = "./source/video/" + name

            # Object to store in Weaviate
            properties = {
                "name": name,
                "path": path,
                "video": self._to_base_64(path), # Weaviate will use the base64 representation of the file to generate a vector.
                "mediaType": "video"
            }

            # Add the object to Weaviate
            self.client.batch.add_data_object(properties, schema_name)


  def display_num_object_in_collection(self,schema_name):
    resp = self.client.query.aggregate(schema_name).with_meta_count().do()
    count = resp.get('data').get('Aggregate').get('Animals')[0].get('meta').get('count')
    print(" The number of items in the collection is {}".format(
      count
    ))

  def json_print(self,data):
      print(json.dumps(data, indent=2))

  def display_media(self,item):
      my_thread = threading.Thread(
        target=self.display_media_inner,
        args=[
          item,
        ],
        daemon=False
      )
      my_thread.start()


  def display_media_inner(self,item):
      path = item["path"]

      if(item["mediaType"] == "image"):
        self.show_image(path)

      elif(item["mediaType"] == "video"):
          play_video(path)

      elif(item["mediaType"] == "audio"):
          self.play_audio(path)

  def show_image(self, path):
      try:
          img = cv2.imread(path, cv2.IMREAD_ANYCOLOR)

          cv2.imshow(path, img)
          cv2.waitKey(0)
      except Exception as e:
          print(f"Error: {e}")

  def play_audio(self,audio_path):
    try:
        pygame.init()
        pygame.mixer.init()
        pygame.mixer.music.load(audio_path)
        pygame.mixer.music.set_volume(0.5)  # Set volume (0.0 to 1.0)
        pygame.mixer.music.play()

        while pygame.mixer.music.get_busy():
            user_input = input("Enter 'p' to pause, 'r' to resume, 's' to stop, or 'q' to quit: ")

            if user_input == 'p':
                pygame.mixer.music.pause()
            elif user_input == 'r':
                pygame.mixer.music.unpause()
            elif user_input == 's':
                pygame.mixer.music.stop()
                break
            elif user_input == 'q':
                pygame.mixer.music.stop()
                pygame.quit()
                break

    except Exception as e:
        print(f"Error: {e}")
    finally:
        pygame.quit()

  def search_for_media_via_text(self,query):
    response = (
        self.client.query
        .get("Animals", "name path mediaType")
        .with_near_text(
            {"concepts": query}
        )
        .with_limit(3)
        .do()
    )

    # Print results
    result = response["data"]["Get"][DEFAULT_SCHEMA_NAME]
    self.json_print(result)
    return result


  def search_for_media_via_image(self,query):
    response = (
        self.client.query
        .get("Animals", "name path mediaType")
        .with_near_image(
            {"image": query}
        )
        .with_limit(3)
        .do()
    )

    # Print results
    result = response["data"]["Get"][DEFAULT_SCHEMA_NAME]
    self.json_print(result)
    return result

  def search_for_media_via_audio(self,query):
    response = (
        self.client.query
        .get("Animals", "name path mediaType")
        .with_near_audio(
            {"audio": query},
        )
        .with_limit(5)
        .do()
    )

    result = response["data"]["Get"][DEFAULT_SCHEMA_NAME]
    self.json_print(result)
    return result

  def search_for_media_via_video(self,query):
    response = (
        self.client.query
        .get("Animals", "name path mediaType")
        .with_near_video(
        # {"video": (
            {"video": query},
        )
        .with_limit(5)
        .do()
    )

    result = response["data"]["Get"][DEFAULT_SCHEMA_NAME]
    self.json_print(result)
    return result
