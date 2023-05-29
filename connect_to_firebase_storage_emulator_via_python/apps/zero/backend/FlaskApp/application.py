from app import app

application = app
# some times for cloud application, WSGI does not like using app.py
# simply make the fil they are looking for and export the app like this
