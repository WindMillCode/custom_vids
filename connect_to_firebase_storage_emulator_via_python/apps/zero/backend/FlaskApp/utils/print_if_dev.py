from utils.local_deps import  local_deps
local_deps()
import pprint
pp = pprint.PrettyPrinter(indent=2, compact=False, width=1)
from utils.env_vars import ENV_VARS

def print_if_dev(item,pretty=False):
    if ENV_VARS.get("FLASK_BACKEND_ENV") == "DEV":
        if pretty == True:
          pp.pprint(item)
        else:
          print(item)
