import sys
if sys.platform == "win32":
    sys.path.append(sys.path[0] + "\\windows\\site-packages")
elif sys.platform =="linux":
    sys.path.append(sys.path[0] + "/linux/site-packages")
import json
import os
import uuid
import datetime
import time
import pprint
import asyncio
import json
import datetime
# import pytz
import time
pp = pprint.PrettyPrinter(indent=4, compact=True, width=1)
import random
import lorem
import jwt
import requests
from datetime import datetime,timedelta
from functools import wraps


import base64
import hashlib
import hmac
import pprint

#azure
from azure.core.pipeline.transport import HttpRequest
from azure.storage.blob._shared.authentication import SharedKeyCredentialPolicy
from urllib.parse import urlparse
# end





class myAzureHttpObject():
    def __init__(self,method, url, headers=None, files=None, data=None):
        self.http_request = HttpRequest(method, url, headers, files, data)
        self.url = url

class mySharedKeyCredentialPolicy(SharedKeyCredentialPolicy):
    None

    def _get_canonicalized_resource(self, request):
        uri_path = urlparse(request.url).path
        return '/' + self.account_name + uri_path


class my_ibm_language_client():


    def error_handler(self,e,env):
        print('my custom error at {}\n'.format(env))
        print(e.__class__.__name__)
        print(e)
        return {
            'status':500,
            'message': 'an error occured check the output from the backend'
        }


    def __init__(self):
        self.datetime = datetime
        self.timedelta = timedelta
        self.time = time
        self.uuid = uuid
        self.random = random
        self.requests = requests
        self.lorem  = lorem
        self.jwt = jwt
        self.wraps = wraps


        # azure blob storage
        self.mySharedKeyCredentialPolicy = mySharedKeyCredentialPolicy
        self.myAzureHttpObject = myAzureHttpObject
        self.blob_count = 0
        self.file_size =0
        #






    def execute(self, data):

        #setup
        jwt = self.jwt
        timedelta = self.timedelta
        datetime = self.datetime
        time = self.time
        uuid = self.uuid
        random = self.random
        lorem = self.lorem
        requests = self.requests
        mySharedKeyCredentialPolicy = self.mySharedKeyCredentialPolicy
        myAzureHttpObject = self.myAzureHttpObject


        env = data.get("env")
        username = data.get("user")
        password = data.get("pass")
        result = data.get("result")
        token = data.get("token")
        target = data.get("target")
        myType  = data.get("type")
        fileName = data.get('fileName')
        mimeType = data.get('mimeType')

        #
        auth_endpoint = data.get("authEndpoint")
        api_name = data.get("apiName")
        method = data.get("method")
        url = data.get("url")
        contentLength = data.get("contentLength")
        #



        if(env == "authConversion"):
            try:
                storage_account_name = os.environ["AZURE_STORAGE_ACCT_NAME"]
                storage_account_key = os.environ["AZURE_STORAGE_ACCT_KEY"]
                api_version = '2020-08-04'
                request_time = datetime.utcnow().strftime('%a, %d %b %Y %H:%M:%S GMT')

                headers = {
                    'verb': method,
                    'Content-Encoding': '',
                    'Content-Language': '',
                    'Content-Length': '',
                    'Content-MD5': '',
                    'Content-Type': '',
                    'Date': '',
                    'If-Modified-Since': '',
                    'If-Match': '',
                    'If-None-Match': '',
                    'If-Unmodified-Since': '',
                    'Range': '',
                    'x-ms-date':request_time,
                    'x-ms-version':api_version
                }

                # modifications for our app

                #


                req = myAzureHttpObject(headers['verb'],url=url,headers=headers)

                mySKCP = mySharedKeyCredentialPolicy(
                    storage_account_name,
                    storage_account_key
                )
                # for debugging look at SharedKeyCredentialPolicy
                mySKCP.on_request(req)
                #


                return {
                    'status':200,
                    'message':{
                        # 'headers':{key:val for key,val in dict(req.http_request.headers).items() if val != ""},
                        'headers':dict(req.http_request.headers),
                        'url':url
                    }
                }

            except BaseException as e:
                self.error_handler(e,env=env)




        return {
            "status" :500,
            "message": "Check the backend env dictionary you did set it so the backend didnt do anything"
        }










