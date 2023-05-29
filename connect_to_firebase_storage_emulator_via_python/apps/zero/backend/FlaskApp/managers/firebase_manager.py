


from utils.local_deps import local_deps
from utils.print_if_dev import print_if_dev
local_deps()
import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
from utils.singleton_exception import SingletonException


class FirebaseManager():
  init= False
  bucket = None
  def __init__(self,env_vars) -> None:
    if(self.init):
      raise SingletonException
    else:
      self.init = True
      flask_backend_env = env_vars.get("FLASK_BACKEND_ENV")
      if flask_backend_env in ["DEV","TEST"]:

          self.connect_to_firebase_https(
            "meetup-app-f1e6f.appspot.com"
          )
      self.bucket = storage.bucket()

  def connect_to_firebase_https(self,storage_bucket):
      firebase_admin.initialize_app(
          options={
              "storageBucket":storage_bucket
          }
      )

  def get_storage_data(self):
    blobs = self.bucket.list_blobs()
    result =[blob.name for blob in blobs]
    return result



