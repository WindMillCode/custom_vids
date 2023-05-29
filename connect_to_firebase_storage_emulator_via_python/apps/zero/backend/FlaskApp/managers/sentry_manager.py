import json
import os
import random
from utils.env_vars import ENV_VARS
from utils.singleton_exception import SingletonException
from utils.local_deps import  local_deps
local_deps()
import sentry_sdk

class SentryManager():
  init= False
  def __init__(self):
    if(self.init):
      raise SingletonException
    else:
      self.init = True


  def init_sentry(self):
    if ENV_VARS.get("FLASK_BACKEND_ENV") == "DEV":
      return
    sentry_sdk.init(
      dsn="https://3fd56ab3c04247bca1cd68e401bd46b6@o4505122556215296.ingest.sentry.io/4505122560999424",
      environment="Flask_{}".format(ENV_VARS.get("FLASK_BACKEND_ENV")),
        # Set traces_sample_rate to 1.0 to capture 100%
        # of transactions for performance monitoring.
        # We recommend adjusting this value in production.
        traces_sample_rate=1.0,
    )




