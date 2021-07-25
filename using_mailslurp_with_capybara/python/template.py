import sys
if sys.platform == "win32":
    sys.path.append(sys.path[0] + "\\site-packages\\windows")
elif sys.platform =="linux":
    sys.path.append(sys.path[0] + "/site-packages/linux")
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
from operator import attrgetter,itemgetter
import traceback


# aws cognito
import boto3
# import boto3.exceptions.ParamValidationError
from botocore.exceptions import ParamValidationError

# from  boto3.CognitoIdentityProvider.Client.exceptions import UsernameExistsException
import hmac, hashlib, base64
app_client_id = os.getenv('COGNITO_USER_CLIENT_ID')
sec_key = os.environ.get("COGNITO_CLIENT_SECRET")
user_pool_id =os.environ.get("COGNITO_USER_POOL_ID")

sts_client_id =os.environ.get("STS_USER_CLIENT_ID")
sts_client_secret =os.environ.get("STS_USER_CLIENT_SECRET")

session_client = boto3.client(
    'sts',
    aws_access_key_id=    sts_client_id,
    aws_secret_access_key=sts_client_secret,
    region_name=os.getenv('COGNITO_REGION_NAME')
)
session_info = session_client.get_session_token()
session_token = session_info.get("Credentials").get("SessionToken")
session_access_key_id = session_info.get("Credentials").get("AccessKeyId")
session_secret_access_key = session_info.get("Credentials").get("SecretAccessKey")

client = boto3.client(
    'cognito-idp',
    aws_access_key_id=    session_access_key_id,
    aws_secret_access_key=session_secret_access_key,
    aws_session_token=session_token,
    region_name=os.getenv('COGNITO_REGION_NAME')
)

# cognito_client = boto3.client(
#     'cognito-idp',
#     aws_access_key_id=     app_client_id,
#     aws_secret_access_key= sec_key,
#     region_name=os.getenv('COGNITO_REGION_NAME')
# )
UsernameExistsException = client.exceptions.UsernameExistsException
CodeMismatchException = client.exceptions.CodeMismatchException
InvalidParameterException = client.exceptions.InvalidParameterException
LimitExceededException = client.exceptions.LimitExceededException
NotAuthorizedException = client.exceptions.NotAuthorizedException

#



# end

class my_ibm_language_client():

    def error_handler(self,e,env):
        print("---------------------------")
        print('my custom error at {}\n'.format(env))
        print(e.__class__.__name__)
        print(traceback.print_exc())
        print("---------------------------")
        return {
            'status':404,
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

        # login from facebook user
        self.auth_enum = {
            "Error":"Log In Again",
            "Authorized":"Authorized",
            "Invalid":"Please try again",
        }
        #

        # aws cognito
        # self.cognito_client = cognito_client
        self.attrgetter = attrgetter # look up python destructuring
        self.itemgetter = itemgetter
        self.client = client
        self.sec_key = sec_key
        self.app_client_id = app_client_id
        self.user_pool_id = user_pool_id
        self.hmac = hmac
        self.hashlib = hashlib
        self.base64 = base64
        #

    def gen_secret_hash(self,func):
        print("-------------------")
        print('{}\n'.format('generate secret hash'))
        def inner(username,app_client_id,sec_key):

            try:
                message = bytes(username+app_client_id,'utf-8')
                key = bytes(sec_key,'utf-8')
                secret_hash = base64.b64encode(hmac.new(key, message, digestmod=hashlib.sha256).digest()).decode()

                return func(username,app_client_id,sec_key,secret_hash)
            except ParamValidationError as e:
                return {
                    'status':401,
                    'message':"Unauthenticated"
                }
            except NotAuthorizedException as e:
                return {
                    'status':401,
                    'message':"Unauthenticated"
                }
            except LimitExceededException as e:
                return {
                    'status':500,
                    'message':"Limit Exceeded"
                }
            except InvalidParameterException as e:
                print(e)
                return {
                    'status':500,
                    'message':"Format the target string properly"
                }
            except CodeMismatchException as e:
                return {
                    'status':404,
                    'message':"Code Mismatch"
                }
            except UsernameExistsException as e:
                return {
                    'status':500,
                    'message':"Username Exists"
                }
            except Exception as e:
                return  self.error_handler(e,"generate secret hash")

        return inner


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
        hmac = self.hmac
        hashlib = self.hashlib
        base64 = self.base64



        env = data.get("env")
        username = data.get("user")
        password = data.get("pass")
        result = data.get("result")
        token = data.get("token")
        target = data.get("target")
        access_token = data.get('access_token')

        # aws cognito
        client = self.client
        # cognito_client = self.cognito_client
        sec_key = self.sec_key
        app_client_id = self.app_client_id
        totp = data.get('totp')
        user_pool_id =self.user_pool_id
        conf_code = data.get('conf_code')
        old_pass = data.get('old_pass')
        new_pass = data.get('new_pass')
        confirm_pass = data.get('confirm_pass')
        #

        if(env == 'createAccount'):
            print('-------------------')
            print('\n{}\n'.format('createAccount'))
            try:

                @self.gen_secret_hash
                def createAccount(a,b,c,s_h):


                    # client sign up
                    client.sign_up(
                        ClientId=app_client_id,
                        Username=username,
                        Password=password,
                        SecretHash=s_h
                    )
                    #

                    return {
                        'status':200,
                        'message':{
                            "message":"OK",
                        }
                    }
                return createAccount(username,app_client_id,sec_key)


            except BaseException as e:
                return self.error_handler(e,env)


        elif(env == 'adminDeleteAcct'):
            print('-------------------')
            print('\n{}\n'.format('adminDeleteAcct'))
            try:
                response =client.admin_delete_user(
                    UserPoolId=user_pool_id,
                    Username=username
                )

                return {
                    'status':200,
                    'message':{
                        'message':'OK'
                    }
                }

            except BaseException as e:
                return self.error_handler(e,env)


        return {
            "status" :500,
            "message": "Check the backend env dictionary you did set it so the backend didnt do anything"
        }










