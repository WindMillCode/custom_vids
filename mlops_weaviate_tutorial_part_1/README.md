
# MLOPS WEAVIATE TUTORIAL PART 1

* after this lab your project shoud look like WeaviateFinal
* if issues restart lab from WeviateStart

## Start up the kubernetes cluster
* you need docker for this if you dont have this [install](https://docs.docker.com/desktop/)
* docker has come along way and is lightweight it should not affect perforamce on your computer, it depends on the containers running

* donwload the docker-compose.yml file
```ps1

curl -o docker-compose.yml "https://configuration.weaviate.io/v2/docker-compose/docker-compose.yml?bind_model=imagebind&generative_cohere=false&generative_openai=false&generative_palm=false&media_type=bind&modules=modules&ref2vec_centroid=false&reranker_cohere=false&reranker_transformers=false&runtime=docker-compose&weaviate_version=v1.21.8&weaviate_volume=named-volume"
```

* start the docker kubernetes cluster
```ps1
docker compose up
```

## Setup weaviate
* install dependencies

```ps1
python -m venv weaviate-env
.\weaviate-env\Scripts\activate
pip install weaviate-client  pandas pyarrow Pillow pygame opencv-python-headless pillow opencv-python
cv2
```

## Create the client
__FILE__ start\manager.py
```py
class WeaviateManager():
  def ___init__(self,client_url):
    self.client = weaviate.Client(
      url="http://localhost:8080",
    )
    while True:
      time.sleep(1000)
      if self.client.is_ready():
        break
```

__FILE__ start\run.py
```py
from manager import WeaviateManager

weaviate_manager = WeaviateManager("http://localhost:8080")
```
## Create a schema

__FILE__ start\manager.py
```py
...

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
...
```


__FILE__ start\run.py
```py
weaviate_manager.create_schema(schema_name)
```
## Import images
__FILE__ start\manager.py
```py
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

```

__FILE__ start\run.py
```py
weaviate_manager.import_images(
  image_list=["cat1.jpg", "cat2.jpg", "cat3.jpg",
        "dog1.jpg", "dog2.jpg", "dog3.jpg",
        "meerkat1.jpg", "meerkat2.jpg", "meerkat3.jpg"],
  schema_name=schema_name
)
```

## Import audio
__FILE__ start\manager.py
```py
  def import_audio(self,audio_list,batch_size=1,schema_name=DEFAULT_SCHEMA_NAME):
    self.client.batch.configure(batch_size)
    with self.client.batch as batch:
      for name in audio_list:
        print(f"Adding {name}")

        # Build the path to the image file
        path = "./source/audio/" + name

        # Object to store in Weaviate
        properties = {
            "name": name,
            "path": path,
            "image": self._to_base_64(path), # Weaviate will use the base64 representation of the file to generate a vector.
            "mediaType": "audio"
        }

        # Add the object to Weaviate
        self.client.batch.add_data_object(properties, schema_name)
```
__FILE__ start\run.py
```py
weaviate_manager.import_audio(
  audio_list=[
    "mixkit-big-thunder-with-rain-1291.wav",
    "mixkit-cartoon-kitty-begging-meow-92.wav",
    "mixkit-cow-moo-1744.wav",
    "mixkit-crowd-laugh-424.wav",
    "mixkit-dog-barking-twice-1.wav",
    "mixkit-jungle-ape-sound-2419.wav",
    "mixkit-little-birds-singing-in-the-trees-17.wav",
    "mixkit-rain-and-thunder-storm-2390.wav",
    "mixkit-rooster-crowing-in-the-morning-2462.wav",
    "mixkit-sick-man-sneeze-2213.wav",
    "mixkit-small-group-cheer-and-applause-518.wav",
  ],
  schema_name=schema_name
)
```


# Video
__FILE__ start\manager.py
```py
  def import_video(self,audio_list,batch_size=1,schema_name=DEFAULT_SCHEMA_NAME):
    self.client.batch.configure(batch_size)
    with self.client.batch as batch:
      for name in audio_list:
        print(f"Adding {name}")

        # Build the path to the image file
        path = "./source/video/" + name

        # Object to store in Weaviate
        properties = {
            "name": name,
            "path": path,
            "image": self._to_base_64(path), # Weaviate will use the base64 representation of the file to generate a vector.
            "mediaType": "video"
        }

        # Add the object to Weaviate
        self.client.batch.add_data_object(properties, schema_name)
```


__FILE__ start\run.py
```py
weaviate_manager.import_video(
  audio_list=[
    "cat-clean.mp4", "cat-play.mp4",
    "dog-high-five.mp4", "dog-with-stick.mp4",
    "meerkat-dig.mp4", "meerkat-watch.mp4"
  ],
  schema_name=schema_name
)
```

## View number of objects in collection
__FILE__ start\manager.py
```py
  def display_num_object_in_collection(self,schema_name):
    resp = self.client.query.aggregate(schema_name).with_meta_count().do()
    count = resp.get('data').get('Aggregate').get('Animals')[0].get('meta').get('count')
    print(" The number of items in the collection is {}".format(
      count
    ))
```

__FILE__ start\run.py
```py
weaviate_manager.display_num_object_in_collection(schema_name)

```

# Query examples

## Helper fns to display results

* along with video_player_app for videos play_audio method already definded
__FILE__ start\manager.py
```py
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
```

__FILE__ start\run.py
```py

```

## Search for media via text
__FILE__ start\manager.py
```py
  def search_for_media_via_text(self,query):
    response = (
        self.client.query
        .get(DEFAULT_SCHEMA_NAME, "name path mediaType")
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
```

__FILE__ start\run.py
```py
media_text_result = weaviate_manager.search_for_media_via_text("dog with stick")
weaviate_manager.display_media(media_text_result[0])
```


## Search for media via image

__FILE__ start\manager.py
```py
  def search_for_media_via_image(self,query):
    response = (
        self.client.query
        .get(DEFAULT_SCHEMA_NAME, "name path mediaType")
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
```

__FILE__ start\run.py
```py
media_text_result = weaviate_manager.search_for_media_via_image("./test/test-cat.jpg")
weaviate_manager.display_media(media_text_result[0])
```

## Search for media via audio

__FILE__ start\manager.py
```py
  def search_for_media_via_image(self,query):
    response = (
        self.client.query
        .get(DEFAULT_SCHEMA_NAME, "name path mediaType")
        .with_near_image(
            {"audio": query}
        )
        .with_limit(3)
        .do()
    )

    # Print results
    result = response["data"]["Get"][DEFAULT_SCHEMA_NAME]
    self.json_print(result)
    return result
```

__FILE__ start\run.py
```py
media_text_result = weaviate_manager.search_for_media_via_image("./test/test-cat.jpg")
weaviate_manager.display_media(media_text_result[0])
```

## Search for media via video

__FILE__ start\manager.py
```py
  def search_for_media_via_video(self,query):
    response = (
        self.client.query
        .get(DEFAULT_SCHEMA_NAME, "name path mediaType")
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
```

__FILE__ start\run.py
```py
media_text_result = weaviate_manager.search_for_media_via_video("./test/test-meerkat.mp4")
weaviate_manager.display_media(media_text_result[0])
```
