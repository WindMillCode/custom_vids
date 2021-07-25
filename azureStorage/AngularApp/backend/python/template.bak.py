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

import pyodbc
import base64
import hashlib
import hmac
from azure.storage.blob import BlobServiceClient
# end

nanonets_apikey = os.environ["NANONETS_APIKEY"].split(" ")
azure_sql_password = os.environ["AZURE_SQL_PASS"]
mysql_password = os.environ["MYSQL_PASS"]



class my_ibm_language_client():

    def sql_setup(self):
        cursor = None
        cnxn = None
        try:

            # driver ="Driver={{ODBC Driver 17 for SQL Server}};Server=tcp:uploader.database.windows.net,1433;Database=myDatabase;Uid=windmillcode;Pwd={};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=3;".format(azure_sql_password)
            driver ="DRIVER={{MySQL ODBC 8.0 Unicode Driver}};\
                SERVER=localhost;\
                DATABASE=myDatabase;\
                USER=windmillcode;\
                PASSWORD={};\
                OPTION=3".format(mysql_password)

            cnxn = pyodbc.connect(
                driver
            )
            cnxn.setdecoding(pyodbc.SQL_WCHAR, encoding='utf-8')
            cnxn.setencoding(encoding='utf-8')
            print("Connection established")
        except BaseException as err:
            print(err)
            None
        else:
            None

        self.cursor = cnxn.cursor()

        # create a table if not exists
        try:

            self.cursor = self.cursor.execute(
                """CREATE TABLE  Scan (
                    my_name             varchar(255),
                    my_group            varchar(255),
                    Total_Amount        varchar(255),
                    my_date             varchar(255),
                    -- would be TIMESTAMP but sneaky chars
                    Merchant_Name       varchar(255),
                    Merchant_Address    varchar(255),
                    Merchant_Phone      varchar(255),
                    photo               varchar(255),
                    my_type             varchar(255)
                )

                """
            )
            self.cursor.execute('commit')
            print("table created")

        except BaseException as e:
            print(e)
            None
        # table exists




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
        self.base64 = base64
        self.hashlib = hashlib
        self.hmac = hmac
        self.BlobServiceClient  = BlobServiceClient

        self.auth ={
            'secret_key':os.urandom(12)
        }
        self.my_login_dict = {
            "Python3":{
                "pass":"Abc",
                "avatar":"python.jpg"
            },

            "Angular":{
                "pass":"Def",
                "avatar":"angular.png"
            },

            "Ruby":  {
                "pass":"Ghi",
                "avatar":"ruby_programming.png"
            },

        }
        self.cursor = None


        { self.my_login_dict[x].update({"login":False,"secret":os.urandom(12),"tries":3}) for x in self.my_login_dict}
        self.auth_enum = {
            "Error":"Log In Again",
            "Authorized":"Authorized",
            "Invalid":"Please try again"
        }

        # nanonets application
        self.model_id = [
            "abd4aa3d-4218-4820-a0fa-376d296e208d",
            "bb787586-c3df-405d-a5fe-b388cedf2ca4" # balaced league model
        ]
        self.nanonets_apikey = nanonets_apikey
        #

        # micro
        # self.sql_setup()

    def _get_canonicalized_headers(self,dev_obj):
        string_to_sign = ''
        x_ms_headers = []
        for name, value in dev_obj.get('headers').items():
            if name.startswith('x-ms-'):
                x_ms_headers.append((name.lower(), value))
        x_ms_headers.sort()
        for name, value in x_ms_headers:
            if value is not None:
                string_to_sign += ''.join([name, ':', value, '\n'])
        return string_to_sign

    # def _get_canonicalized_headers(self,request):
    #     string_to_sign = ''
    #     x_ms_headers = []
    #     for name, value in request.http_request.headers.items():
    #         if name.startswith('x-ms-'):
    #             x_ms_headers.append((name.lower(), value))
    #     x_ms_headers.sort()
    #     for name, value in x_ms_headers:
    #         if value is not None:
    #             string_to_sign += ''.join([name, ':', value, '\n'])
    #     return string_to_sign


    def token_required(self,func):
        def inner(token,user):
            if not token:
                return 'Token is missing!'
            target_dict = self.my_login_dict.get(user)
            if( target_dict.get("tries") <= 0):
                return {
                    "status":401,
                    "message":self.auth_enum["Error"]
                }
            try:
                mySecret = self.my_login_dict.get(user).get("secret")
                payload = jwt.decode(token, key=mySecret, algorithms=["HS256"])
                print(payload)
                print("Authorized")
                func(token,user)
            except jwt.InvalidTokenError as e:
                print(e)
                print('Invalid')
                self.my_login_dict.get(user)["tries"] -=1
                if(self.my_login_dict.get(user)["tries"] <= 0):
                    return {
                        "status":401,
                        "message":self.auth_enum["Error"]
                    }
                return {
                    "status":403,
                    "message":self.auth_enum["Invalid"]
                }
            except BaseException as e:
                print(e)
                print('Error')
                return {
                    "status":401,
                    "message":self.auth_enum["Error"]
                }
            return func(token,user)
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
        cursor = self.cursor
        base64 = self.base64
        hmac = self.hmac
        hashlib =self.hashlib
        BlobServiceClient = self.BlobServiceClient

        env = data.get("env")
        username = data.get("user")
        password = data.get("pass")
        result = data.get("result")
        token = data.get("token")
        target = data.get("target")
        type = target = data.get("type")

        #
        auth_endpoint = data.get("authEndpoint")
        api_name = data.get("apiName")
        #


        # nanonets app
        model_id = self.model_id
        nanonets_apikey = self.nanonets_apikey
        #

        my_login_dict = self.my_login_dict
        #


        if( env == "refresh_page"):
            try:
                refresh_user= data.get("refresh_user")
                refresh_token= data.get("refresh_token")
                @self.token_required
                def refresh_page(token,user):
                    target_dict = my_login_dict.get(user)
                    target_dict["login"] = True
                    target_dict["tries"] = 3
                    access_token= jwt.encode(
                        payload={
                            "expiration":str(datetime.utcnow() + timedelta(seconds=120)),
                        },
                        key=target_dict.get("secret"),
                        algorithm="HS256"
                    )
                    return {
                        'status':200,
                        'message':json.dumps(
                            {
                                'message':'allow user to proceed',
                                'user':user,
                                'avatar':target_dict.get("avatar"),
                                'token':access_token
                            }
                        ),
                    }
                return refresh_page(refresh_token,refresh_user)
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return {
                    'status':500,
                    'message': 'an error occured check the output from the backend'

                }


        elif(env == "login"):
            try:

                target_dict = my_login_dict.get(username)
                if(target_dict.get("pass") == password):
                    target_dict["login"] = True
                    target_dict["tries"] = 3
                    access_token= jwt.encode(
                        payload={
                            "expiration":str(datetime.utcnow() + timedelta(seconds=120)),
                        },
                        key=target_dict.get("secret"),
                        algorithm="HS256"
                    )
                    refresh_token= jwt.encode(
                        payload={
                            "expiration":str(datetime.utcnow() + timedelta(minutes=120))
                        },
                        key=target_dict.get("secret"),
                        algorithm="HS256"
                    )
                    return {
                        'status':200,
                        'refresh_token':refresh_token,
                        'refresh_user':username,
                        'message':json.dumps(
                            {
                                'message':'allow user to proceed',
                                'avatar':target_dict.get("avatar"),
                                'token':access_token
                            }
                        ),
                    }

                return  {
                        'status':401,
                        'message':'Login Failed'
                    }

            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return {
                    'status':500,
                    'message': 'an error occured check the output from the backend'
                }

        elif(env == "authConversion"):
            try:
                storage_account_name = 'devstoreaccount1'
                storage_account_key = 'Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw=='
                #api_version = '2016-05-31'
                api_version = '2020-08-04'
                request_time = datetime.utcnow().strftime('%a, %d %b %Y %H:%M:%S GMT')

                CanonicalizedHeaders = ""
                CanonicalizedResource = ""
                Verb= ""


                if(type == "listContainers"):
                    Verb = "GET"
                    CanonicalizedHeaders = self._get_canonicalized_headers({
                        'headers':{
                            'x-ms-date':request_time,
                            'x-ms-version':api_version
                        }
                    })
                    CanonicalizedResource = '/' + storage_account_name +'/'+storage_account_name + '\n' + auth_endpoint
                elif(type == "createContainer"):
                    Verb = "PUT"
                    CanonicalizedHeaders = self._get_canonicalized_headers({
                        'headers':{
                            'x-ms-date':request_time,
                            'x-ms-version':api_version
                        }
                    })
                    CanonicalizedResource = '/' + storage_account_name +'/'+storage_account_name + '\n' + auth_endpoint



                string_params = {
                    'verb': Verb,
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
                    'CanonicalizedHeaders': CanonicalizedHeaders,
                    'CanonicalizedResource':CanonicalizedResource
                }

                string_to_sign = (string_params['verb'] + '\n'
                                + string_params['Content-Encoding'] + '\n'
                                + string_params['Content-Language'] + '\n'
                                + string_params['Content-Length'] + '\n'
                                + string_params['Content-MD5'] + '\n'
                                + string_params['Content-Type'] + '\n'
                                + string_params['Date'] + '\n'
                                + string_params['If-Modified-Since'] + '\n'
                                + string_params['If-Match'] + '\n'
                                + string_params['If-None-Match'] + '\n'
                                + string_params['If-Unmodified-Since'] + '\n'
                                + string_params['Range'] + '\n'
                                + string_params['CanonicalizedHeaders']
                                + string_params['CanonicalizedResource'])

                signed_string = base64.b64encode(hmac.new(base64.b64decode(storage_account_key), msg=string_to_sign.encode('utf-8'), digestmod=hashlib.sha256).digest()).decode()

                headers = None
                if(type == "listContainers"):
                    headers = {
                        'x-ms-date' : request_time,
                        'x-ms-version' : api_version,
                        'Authorization' : ('SharedKey ' + storage_account_name + ':' + signed_string)
                    }
                elif(type == "createContainer"):
                    headers = {
                        'x-ms-date' : request_time,
                        'x-ms-version' : api_version,
                        'Authorization' : ('SharedKey ' + storage_account_name + ':' + signed_string)
                    }



                service = BlobServiceClient(account_url="http://127.0.0.1:10000/devstoreaccount1", credential="Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==")
                container = service.list_containers()
                print(container)

                return {
                    'status':200,
                    'message':{
                        'headers':headers
                    }
                }

            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return {
                    'status':500,
                    'message': 'an error occured check the output from the backend'

                }

        elif(env =="upload"):
            try:

                print(result)
                result["photo"] = "my_url"
                fields = list(result)
                modify_fields = {
                    "Group":"my_group",
                    "Date":"my_date",
                    "type":"my_type"
                }
                fields = ['{}'.format(modify_fields.get(x) if modify_fields.get(x)    else x) for x in fields   ]
                entries = ['"{}"'.format(x) for x in list(result.values())]
                query_string = """
                INSERT INTO Scan ({}, {}, {}, {}, {}, {}, {}, {})
                VALUES ({}, {}, {}, {}, {}, {}, {}, {})
                """.format(*fields,*entries )
                print(query_string)
                cursor.execute(query_string)
                cursor.execute("commit")
                return {
                    'status':200,
                    'message':'OK'
                }
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return {
                    'status':500,
                    'message': 'an error occured check the output from the backend'
                }

        elif(env =="receiptOCR"):
            try:
                # @self.token_required
                # def receiptOCR(token,user):

                #     url =  'https://app.nanonets.com/api/v2/OCR/Model/{}/LabelUrls/'.format(model_id[0])
                #     headers = {
                #         'accept': 'application/x-www-form-urlencoded'
                #     }
                #     data = {
                #         "urls":["https://uc7354fab893eaf8eaba499720df.previews.dropboxusercontent.com/p/thumb/ABLaFfueJ6epfZDdZJPbu3g7j_zawSHSBl2AzxRAuir8Eh-EGLebsV-TO9aBlDqn15UWXzCUPMjot2w5T7NVNW-YRGiVvsvj-YBHoAetnLxp5LbrvTmHRr2rZ16NIPFn6fm5rD3aOH7FAJM6dMoqQVZrKaqP3FNaOKWaDrfBadJL-UPOvNk28x8kWbTmSG_xBUf9XRbhMZZvrOm_l-LlCRI0AD5I5wqT3xfrsJUBo1q0Jzj5LGE5Ih106zt1y342IdjlKu2kJnEpa7aJJMgv_YAV87o2LWhW6c4OBDW4v60xa-RfYxTE2vQr09HD4bSxCpLP-eVK7u0Wvvt_ksaUDWKFfHRJiBDXhjl0LMgfRyF3EhNnz1Y5Ya0oceLQCbebFxrQXGy_h85mbI9a4qLW_pbI/p.jpeg?fv_content=true&size_mode=5"]
                #     }
                #     response = requests.post(
                #         url,
                #         headers=headers,
                #         auth=requests.auth.HTTPBasicAuth('ETZrFHcjy_n3y_hNuHOlq5pNUGIORx7o', ''),
                #         data=data
                #     )
                #     return {
                #         "status":200,
                #         "message":response.text
                #     }
                # return receiptOCR(token=token,user=username)
                url =  'https://app.nanonets.com/api/v2/OCR/Model/{}/LabelUrls/'.format(model_id[1])
                headers = {
                    'accept': 'application/x-www-form-urlencoded'
                }
                data = {
                    "urls":["https://uc7354fab893eaf8eaba499720df.previews.dropboxusercontent.com/p/thumb/ABLaFfueJ6epfZDdZJPbu3g7j_zawSHSBl2AzxRAuir8Eh-EGLebsV-TO9aBlDqn15UWXzCUPMjot2w5T7NVNW-YRGiVvsvj-YBHoAetnLxp5LbrvTmHRr2rZ16NIPFn6fm5rD3aOH7FAJM6dMoqQVZrKaqP3FNaOKWaDrfBadJL-UPOvNk28x8kWbTmSG_xBUf9XRbhMZZvrOm_l-LlCRI0AD5I5wqT3xfrsJUBo1q0Jzj5LGE5Ih106zt1y342IdjlKu2kJnEpa7aJJMgv_YAV87o2LWhW6c4OBDW4v60xa-RfYxTE2vQr09HD4bSxCpLP-eVK7u0Wvvt_ksaUDWKFfHRJiBDXhjl0LMgfRyF3EhNnz1Y5Ya0oceLQCbebFxrQXGy_h85mbI9a4qLW_pbI/p.jpeg?fv_content=true&size_mode=5"]
                }
                response = requests.post(
                    url,
                    headers=headers,
                    auth=requests.auth.HTTPBasicAuth(nanonets_apikey[1], ''),
                    data=data
                )
                return {
                    "status":200,
                    "message":response.text
                }


            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return {
                    'status':500,
                    'message': 'an error occured check the output from the backend'
                }

        elif(env =="dummyReceiptOCR"):
            try:
                message ={
                    "message": "Success",
                    "result": [
                        {
                            "message": "Success",
                            "input": "https://uc7354fab893eaf8eaba499720df.previews.dropboxusercontent.com/p/thumb/ABLaFfueJ6epfZDdZJPbu3g7j_zawSHSBl2AzxRAuir8Eh-EGLebsV-TO9aBlDqn15UWXzCUPMjot2w5T7NVNW-YRGiVvsvj-YBHoAetnLxp5LbrvTmHRr2rZ16NIPFn6fm5rD3aOH7FAJM6dMoqQVZrKaqP3FNaOKWaDrfBadJL-UPOvNk28x8kWbTmSG_xBUf9XRbhMZZvrOm_l-LlCRI0AD5I5wqT3xfrsJUBo1q0Jzj5LGE5Ih106zt1y342IdjlKu2kJnEpa7aJJMgv_YAV87o2LWhW6c4OBDW4v60xa-RfYxTE2vQr09HD4bSxCpLP-eVK7u0Wvvt_ksaUDWKFfHRJiBDXhjl0LMgfRyF3EhNnz1Y5Ya0oceLQCbebFxrQXGy_h85mbI9a4qLW_pbI/p.jpeg?fv_content=true&size_mode=5",
                            "prediction": [
                                {
                                    "label": "Total_Amount",
                                    "xmin": 1260,
                                    "ymin": 899,
                                    "xmax": 1291,
                                    "ymax": 972,
                                    "score": 0.9973845,
                                    "ocr_text": "39.56"
                                },

                                {
                                    "label": "Date",
                                    "xmin": 1853,
                                    "ymin": 1227,
                                    "xmax": 1890,
                                    "ymax": 1457,
                                    "score": 0.98718625,
                                    "ocr_text": "MAY 30, 2021"
                                },
                                {
                                    "label": "Merchant_Name",
                                    "xmin": 431,
                                    "ymin": 701,
                                    "xmax": 537,
                                    "ymax": 1309,
                                    "score": 0.9943729,
                                    "ocr_text": "CVS pharmacy"
                                },
                                {
                                    "label": "Merchant_Address",
                                    "xmin": 531,
                                    "ymin": 893,
                                    "xmax": 602,
                                    "ymax": 1279,
                                    "score": 0.99992985,
                                    "ocr_text": "1172 3RD AVE\nNEW YORK, NY 10065"
                                },
                                {
                                    "label": "Merchant_Phone",
                                    "xmin": 576,
                                    "ymin": 957,
                                    "xmax": 624,
                                    "ymax": 1198,
                                    "score": 0.99999,
                                    "ocr_text": "2129888319"
                                }
                            ],
                            "page": 0,
                            "request_file_id": "795d41c4-604c-4833-a03b-812c3edfc8ec",
                            "filepath": "uploadedfiles/bb787586-c3df-405d-a5fe-b388cedf2ca4/PredictionImages/1798715163.jpeg",
                            "id": "b6a739a8-c2ad-11eb-87e3-8a699a45b911",
                            "rotation": 270
                        }
                    ],
                    "signed_urls": {
                        "uploadedfiles/bb787586-c3df-405d-a5fe-b388cedf2ca4/PredictionImages/1798715163.jpeg": {
                            "original": "https://nnts.imgix.net/uploadedfiles/bb787586-c3df-405d-a5fe-b388cedf2ca4/PredictionImages/1798715163.jpeg?expires=1622548099&or=0&s=03ca88661b403a69a6046443c4ef40de",
                            "original_compressed": "https://nnts.imgix.net/uploadedfiles/bb787586-c3df-405d-a5fe-b388cedf2ca4/PredictionImages/1798715163.jpeg?auto=compress&expires=1622548099&or=0&s=21cb6b37fc8ab17b87c8ff6ec9ea0616",
                            "thumbnail": "https://nnts.imgix.net/uploadedfiles/bb787586-c3df-405d-a5fe-b388cedf2ca4/PredictionImages/1798715163.jpeg?auto=compress&expires=1622548099&w=240&s=fd12cb189c15f78f65f3d801d4debc6a",
                            "acw_rotate_90": "https://nnts.imgix.net/uploadedfiles/bb787586-c3df-405d-a5fe-b388cedf2ca4/PredictionImages/1798715163.jpeg?auto=compress&expires=1622548099&or=270&s=a858d1756050650c1d62784d62154d40",
                            "acw_rotate_180": "https://nnts.imgix.net/uploadedfiles/bb787586-c3df-405d-a5fe-b388cedf2ca4/PredictionImages/1798715163.jpeg?auto=compress&expires=1622548099&or=180&s=65a2e929e8c2b2ef6b320774ac4324fb",
                            "acw_rotate_270": "https://nnts.imgix.net/uploadedfiles/bb787586-c3df-405d-a5fe-b388cedf2ca4/PredictionImages/1798715163.jpeg?auto=compress&expires=1622548099&or=90&s=4079d5d12021a59d5188704697ecc698",
                            "original_with_long_expiry": "https://nnts.imgix.net/uploadedfiles/bb787586-c3df-405d-a5fe-b388cedf2ca4/PredictionImages/1798715163.jpeg?expires=1638085699&or=0&s=fc2361f3a97ff316d7e7106b015b5b1f"
                        }
                    }
                }
                return {
                    'status':200,
                    'message':json.dumps([
                        {
                            "label":x.get("label"),
                            "ocr_text":x.get("ocr_text")
                        } for x in  message.get("result")[0].get("prediction")
                    ])
                }
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return {
                    'status':500,
                    'message': 'an error occured check the output from the backend'

            }



        return {
            "status" :500,
            "message": "Check the backend env dictionary you did set it so the backend didnt do anything"
        }










