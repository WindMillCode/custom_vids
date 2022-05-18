
# Making a sql table with flask and sqlalchemy


 


## Step 1 Install the required packages
* in terminal
* for windows users
```
pip install -r requirements.txt --upgrade --target .\site-packages\windows
```

* for linux/macos
```
pip install -r requirements.txt --upgrade --target ./site-packages/linux
```

## Step 2 run the app
```
python app.py
```

## sqlalchemy
```py
db.create_all()
```
will create the database file
```py
db.engine.execute
```
* will execute any sql script 
* in this case a simple table is made



## Resources
https://betterprogramming.pub/how-to-execute-plain-sql-queries-with-sqlalchemy-627a3741fdb1

