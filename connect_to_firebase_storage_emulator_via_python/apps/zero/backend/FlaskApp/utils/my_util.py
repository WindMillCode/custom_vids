import secrets
import string
import os
from time import sleep
from urllib.parse import parse_qs, urlencode, urlparse
from configs import CONFIGS
from utils.local_deps import  local_deps
local_deps()
from sqlalchemy import create_engine
import requests
from flask.json import jsonify
import json






from werkzeug.http import parse_cookie


import sendgrid






class APIMsgFormat():
  def __init__ (self,data=None,code=CONFIGS.endpointMsgCodes["success"],access_token=None,msg="OK"):
    if data:
      self.data = data
    self.access_token = access_token
    self.msg = msg
    self.code = code

  data ={
    "please ":"provide data in the data property"
  }
  access_token =""
  msg = "OK"
  code = ""

  def return_flask_response(self):
    return jsonify(self.__dict__)





def generate_random_string(len =7):
    return ''.join(secrets.choice(string.ascii_uppercase + string.ascii_lowercase) for i in range(len))

def turn_query_params_to_object(url):
    parsed_url = urlparse(url)
    return {
        x:y[0] for x,y in parse_qs(parsed_url.query).items()
    }

def turn_cookie_to_object(cookie_list,cookie_name):
    cookie = next(
        (cookie for cookie in cookie_list if cookie_name in cookie),
        None
    )
    return parse_cookie(cookie) if cookie is not None else cookie


def generate_twillio_sendgrid_email_req_body(from_email,to_emails=[],personalizations_subject="Sample Subject",email_template="Sample Email"):
  return {
    "personalizations":[{
      "to":[{"email":email} for email in to_emails],
      "subject":personalizations_subject
    }],
    "from":{"email":from_email},
    "content":[
      {
        "type": "text/html",
        "value": email_template
      }
    ]
  }


