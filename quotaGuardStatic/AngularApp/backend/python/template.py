import sys
if sys.platform == "win32":
    sys.path.append(sys.path[0] + "\\windows\\site-packages")
elif sys.platform =="linux":
    sys.path.append(sys.path[0] + "/linux/site-packages")

import os
import pprint
import json
import datetime
# import pytz
import time
pp = pprint.PrettyPrinter(indent=4, compact=True, width=1)

from datetime import datetime,timedelta
from functools import wraps
import pyodbc

import pprint

#azure

# end




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
        self.pyodbc = pyodbc



    def execute(self, data):

        #setup


        pyodbc = self.pyodbc
        env = data.get("env")


        #

        #

        if(env == "connect"):
            print('-------------------')
            print('\n{}\n'.format('connect'))
            try:
                azure_sql_password = os.environ.get("PASSWORD")
                driver ="Driver={{ODBC Driver 17 for SQL Server}};\
                    Server=uploader.database.windows.net,1433;\
                    Database=yourdatabase;\
                    Uid=windmillcode;\
                    Pwd={};\
                    Encrypt=yes;\
                    TrustServerCertificate=yes;\
                    Connection Timeout=5;".format(azure_sql_password)

                cnxn = pyodbc.connect(
                    driver
                )
                cnxn.setdecoding(pyodbc.SQL_WCHAR, encoding='utf-8')
                cnxn.setencoding(encoding='utf-8')
                print("Connection established")
                return {
                    'status':200,
                    'message':'OK'
                }

            except BaseException as e:

                self.error_handler(e,env)



        return {
            "status" :500,
            "message": "Check the backend env dictionary you did set it so the backend didnt do anything"
        }










