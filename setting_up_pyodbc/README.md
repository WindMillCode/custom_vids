
# Setting Up PYODBC in your backend env

* after this lab your project shoud look like AngularAppFinal
* if issues restart lab from AngularAppStart

## Download the Python Backend
* download the backend here [here](https://github.com/WindMillCode/custom_vids/tree/master/setting_up_pyodbc)




## Required files
* open
template.py
set_backend_env.ps1


## Setup the backend env

IN in the terminal run 
```ps1
pip install -r requirements.txt --upgrade --target .\site-packages
```

if you dont have powershell availble all you need to do is set the env var for MYSQL_PASS to you sql passowrd 

## Run  the script

* if all is fine and well you should be connected and a table should be created 
* if not find odbc data sources  


try 
C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Windows Administrative Tools

choose the application for your arch 32-bit or 64-bit,
System DSN ->  aDD -> MYsql ODBC 8.0 unicode driver

if its not there 
https://dev.mysql.com/downloads/connector/odbc/
