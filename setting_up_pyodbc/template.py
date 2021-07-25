import sys
import os
sys.path[0] += "\\site-packages"
import pyodbc
mysql_password = os.environ["MYSQL_PASS"]

cursor = None
cnxn = None

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


# do some sql
cursor = cnxn.cursor()
cursor.execute(
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
cursor.execute('commit')
# 