
#  QuotaguardStatic static IP for all your resources

## Start the Angular app
* download the frontend [here](https://downgit.github.io/#/home?url=https://github.com/WindMillCode/custom_vids/tree/master/quotaGuardStatic)
* open a terminal and head to project root and run this command
```ps1
cd AngularApp
npm install -s
npx ng serve --open true
```

## Required Fies;
* AngularApp/backend/python/.qgtunnel
* AngularApp/backend/python/Procfile
* AngularApp/src/app/app.component.ts

## Heroku CLI 
* lab assumes you have heroku and git installed 


* cd to project root and git init
``` cd 
cd ../
git init 
```

* login to heroku 
```ps1
heroku login
```

* in the heroku dashboard you will create your app 
* also in github create a repo for  your ap

* choose your app name
```ps1
git remote and origin [github repo URL]
heroku git:remote -a  my-app
```

### Heroku Buildpacks
* needed to use extras features not in your app
* here we use pyodbc but we add extra buildpack to use the driver
[resource](https://devcenter.heroku.com/articles/buildpacks)

* add the buildpacks to your app
```ps1
heroku buildpacks:add --index 1 heroku-community/apt
heroku buildpacks:add --index 2 heroku/python 
heroku buildpacks:add --index 3 https://github.com/matt-bertoncello/python-pyodbc-buildpack.git
```

## QuotaGuardStatic
__FILE__ .qgtunnel
* quotaguard static is a static IP for all your resources
* you must have vendor and bin, files in the backend root
* thq .qgtunnel file is config file the 
* accept flag if for when it see a new connection on that port on the computer in this case localhost
* connect flag means the target URL, proxy the request whenever it is made
	* replace url with your sql url that requries a static IP 
* transparent flag means I could use either 127.0.0.1 or localhost
* encrypted means encrpyt the traffic, not required by the OBDC 17 driver already encrptys the message in its connection string


* head to resources tab in the heroku dashboard and add addons
* find quotaguardstatic and choose the free plan
* now head to your config vars and see that its updated

## Heroku is default dynamic


__FILE__ app.component.ts 
* in 'replace your url here' paste your heroku url, in domains section of the settings tab
* deploy the backend to heroku
```ps1
git add . 
git commit -m"UPDATE"
git subtree push --prefix AngularApp/backend/python  heroku master;
```

* head to the app and hit the connect button
* we get an error about static IP 

## use quotaguardstatic

* quotaguardstatic is availble all you need to do is to use it 

__FILE Procfile__
replace line 1 with this code
```ps1
web: bin/qgtunnel python tornado_heroku_server.py 0.0.0.0:\3005
```

