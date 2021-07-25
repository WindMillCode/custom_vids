# Dealing with Advanced Bundler Issues with Puffing Billy 

## [Youtube Video Walkthrough](https://youtu.be/q0tawoUMSQ4)

## Begin 

download project [here](https://downgit.github.io/#/home?url=https://github.com/codequickie123/custom_vids/tree/master/capybara_and_puffing_billy)
* at the end of this lab e2e should look like e2e_final 
* if issues refer to e2e_start 

## Puffing Billy
an http interceptor library, like burpsuite


## Issues
* right now there was an issue bundler wanted me to report to github it was not able to properly install puffing billy


## Situation 
head to AngularApp/src/testing/e2e
open Gemfile in your code editor
```rb
# frozen_string_literal: true


source "https://rubygems.org"

git_source(:github) {|repo_name| "https://github.com/#{repo_name}" }

# gem "rails"
# frozen_string_literal: true

# gem 'capybara'
# gem 'ffi'
# gem 'rspec'
# gem 'rails_helper'
# gem 'rake'
# gem 'percy-capybara', '~> 4.3.3'
# gem 'sauce_whisk'
# gem 'selenium-webdriver'
# gem 'table_print'

gem 'puffing-billy', :group => :test
```

### Keeping installations local to your project
* keep installations local
	* the --path is depercated 
	* use vendor\bundle a bundler convention
```ps1
bundle config set --local path vendor\bundle
bundle install
```

cant install puffing billy because file not found
* dependency issues we can try to instaal the dependency beforehadn

```rb
gem 'eventmachine'
```
```ps1
bundle install # refer to .bundle/config to perform local install no worries
```


### Using platforms


* doesnt work mabye we need a different platform
	* to see all avaible platforms give a bad platform name

```rb
# gem 'eventmachine', :platforms => :python to get an error but a list of all platforms
gem 'eventmachine', :platforms => :ruby
```
```ps1
bundle install
```

* we see that it seemed to ignore you and install the same platform
	* this is because the whole bundle must come from the same package, cant expect dll to work on Linux neither .so or .sh to work on Windows, bundler is incomaptiable and if you force it by commenting and doing seperate installs, when you run an application in this instance it will throw an error, 
* when you get PATH issues and FILE location issues in windows,send to upper level directory talk about the 
* we learn about the  [manifest](https://docs.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation#enable-long-paths-in-windows-10-version-1607-and-later) that can override this please provide a pull requests to help implement this otherwise we take the whole project and move up some directory


```rb
gem 'eventmachine'
gem 'puffing-billy', :group => :test
```
```ps1
bundle config set --local path vendor\bundle  # do wee need to since its the relative path of .\, SAFE than sorry
bundle install
```

### Configure Make ????
* we get an configure make error, at this point most people want to quit, but remember that platform logc we can force ruby to use a different platform for the whole gemfile
```ps1
bundle config set --local force_ruby_platform true
bundle install
```

* it wasn't enough wee see some low level modules are missing

### Github
* we see at the top of the Gemfile, we grab the eventmachine_httpserver lib from 
https://github.com/eventmachine, lets use a different library
* go to https://github.com/eventmachine_httpserver,
* luckily we see evma_httpserver built on top of eventmachine, so at its base evma_httpserver is a derived class of  eventmachine_httpserver
* also you might have to delete your Gemfile.lock as it might be grabbing from the same github source and refusing to cooperate

```rb
gem 'eventmachine_httpserver', github: "eventmachine/evma_httpserver"
```


* this requires git to be installed, but we dont do system installs use portable git for windows [here](https://git-scm.com/download/win)
setup the 32-bit or 64-bit PORTABLE extract and place the Folder the PATH
* restart the computer if need be
* head to the needed directory

```ps1
git-cmd
bundle install
```

* success 
in Gemfile uncomment the rest of the gems
bundle install
move the testing folder back to where it was taken from when you downloaded it 
run the frontend with this command
	if you are not familar with angular look [here](https://www.youtube.com/watch?v=DKoHBQOfGBY)
```ps1
npx ng serve -c=play
```
and start your testing stack app with the command
```ps1
bundle exec rspec app-e2e.rb
```

### Opsenssl

* we get an error Encrpytion not avaiable on eventmachine,
	eventmachine is a http proxy server
	its 2020 https is default
	needa get openSSL 
	shouldn't this be taken care of 
	thats why codequickie is here

download openssl lib  [here](http://slproweb.com/products/Win32OpenSSL.html)
grab the win64, (unless on a 32bit win OS) Win64 OpenSSL v1.1.1i (NOT THE LIGHT VERSION)
.msi unzip and install 
remember local install	
```ps1
bundle config build.eventmachine --local --verbose --with-ssl-dir=path/to/openssl
bundle install 
bundle exec rspec app-e2e.rb
```

* sucess

### Comments

* if any issues or comments add here 
* sometimes you have to delete the ruby folder and install the setup again, length but understand whats happening to do it less
* if there are devkit issues [here](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit)
* the BUNDLE_BUILD__EVENTMACHINE with ssl dir might end up in another path




## Resources

[Discussion](https://github.com/eventmachine/eventmachine/pull/601)
[Capybara docs](https://rubydoc.info/github/teamcapybara/capybara/Capybara/Node/Finders)
[Ruby Selenium Docs](https://www.selenium.dev/selenium/docs/api/rb/Selenium.html)
[Puffing Billy](https://github.com/oesmith/puffing-billy)


