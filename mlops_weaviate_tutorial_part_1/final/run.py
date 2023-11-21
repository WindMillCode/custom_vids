from manager import WeaviateManager


schema_name = "Animals"
weaviate_manager = WeaviateManager("http://localhost:8080")
weaviate_manager.create_schema(schema_name)
weaviate_manager.import_images(
  image_list=["cat1.jpg", "cat2.jpg", "cat3.jpg",
        "dog1.jpg", "dog2.jpg", "dog3.jpg",
        "meerkat1.jpg", "meerkat2.jpg", "meerkat3.jpg"],
  schema_name=schema_name
)
weaviate_manager.import_audio(
  target_list=[
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
weaviate_manager.import_video(
  target_list=[
    "cat-clean.mp4", "cat-play.mp4",
    "dog-high-five.mp4", "dog-with-stick.mp4",
    "meerkat-dig.mp4", "meerkat-watch.mp4"
],
  schema_name=schema_name
)
weaviate_manager.display_num_object_in_collection(schema_name)
media_text_result = weaviate_manager.search_for_media_via_text("dog with stick")
weaviate_manager.display_media(media_text_result[0])

media_text_result = weaviate_manager.search_for_media_via_image("./test/test-cat.jpg")
weaviate_manager.display_media(media_text_result[0])

media_text_result = weaviate_manager.search_for_media_via_video("./test/test-meerkat.mp4")
weaviate_manager.display_media(media_text_result[0])
