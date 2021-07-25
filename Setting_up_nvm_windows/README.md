
# Setting up NVM  on your windows computer

* do a system backup of your computer before we begin

## Delete the existing nodejs installation

* save all your global packages they are not coming along, local packages will be fine because you are deleteng npm and you are not deleting your projects 

delete
C:\Users\User\AppData\Local\npm-cache
C:\Users\User\AppData\Roaming\npm
	* and any other familiar refrences

C:\Program Files\nodejs
C:\ProgramData\chocolatey

### Remove accout env vars
* [windows search icon] -> [edit the system environoment variables] 
* remove ChocolateyLastPathUpdate
* remove "C:\Users\User\AppData\Roaming\npm" from the PATH

### Remove system env vars
* REMOVE ChocolateyInstall
* remove 
	* C:\ProgramData\chocolatey\bin
	* C:\Program Files\nodejs\

* restart the computer



## Installing NVM

* head [here](https://github.com/coreybutler/nvm-windows/releases/)
* downloadthe zip file __nvm-noinstall.zip__
* extract the zip file to a place where you want the o
* run the install command as an administrator
* make sure that the results in the settings come up like this after you run the installer so the env vars can be set
```txt
root: C:\Users\User\Documents\nvm-noinstall 
path: C:\Program Files\nodejs 
arch: 64 
proxy: none
```

### Installing node
after exit out the admin shell and head to a regular shell
* run
```ps1
nvm install v["version of your choice"]
#  ex v.14.17.3
```
and use to see it working

## NPM wont update 
* come to find you have an annoying error which wont let npm update to the lsb
* grab the release you need from [here](https://github.com/npm/cli/releases)
* unarchine the Source code and it would look like a package in node_modules this is what npm actually looks like 
* in the nvm folder there is a folder of the version of node your working with
* head to nvm/[your-version-here]/node_modules/npm and delete the folder contents
* replace with the folder contents of the target npm Source code you downloaded 
* head to the bin dir and move
npx.cmd
npx
npm.cmd
npm
nvm/[your-version-here]

### Challenge
* the error did say that npm wasnot found in the node_modules/npm/bin folder so leave it there and try to update see what happens

