import time
from configs import CONFIGS
import requests;
import math
from flask import Blueprint,request
import json
from urllib.parse import urlparse

from utils.my_util import APIMsgFormat

healthcheck_endpoint =Blueprint("healthcheck", __name__, url_prefix="/healthz")

@healthcheck_endpoint.route('/',methods=['GET'])
def healthcheck():
  time.sleep(1)
  res = APIMsgFormat(msg="A-OK",code=CONFIGS.endpointMsgCodes["success"])
  return res.return_flask_response(),200



@healthcheck_endpoint.route('/test',methods=['GET'])
def mytest_healthcheck():

  res = APIMsgFormat(msg=request.url,code=CONFIGS.endpointMsgCodes["success"])
  return res.return_flask_response(),200

