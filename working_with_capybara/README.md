# E2E Testing With Capybara And Angular

refer to 
[form control directive](working_with_capybara\AngularApp\src\app\directive\form-control.directive.ts)
[e2e test](working_with_capybara\AngularApp\testing\e2e\app-e2e.rb)
to understand how capybara and angular work in tandem

## POINTS

* if Capybara.run_server = false you can use it on any web app
* talk about overriding methods in capybara
* talking about navigating capybara and selenium to get what you want
	* talk about about modifying the options for the drivers which are managed in the service class
* talk about the logger output location and how its relative to process path
* if Capybara.default_max_wait_time =  waith for n seconds, for an element to appar on a page so you dont have to code it in every time
* if an item is not in the viewport capybara still knows about it with Capybara.ignore_hidden_elements = false
* talk about RSpec configure gives you access to the feature the scenario, 
* the lifecycle hooks are for setup only the rspec tests only the actual scenario

### Dropbox
* should take a file
* should return the name of a file 

### UI /Frontend
* can I get to the homepage
* resize for mobile and large desktop
* click button what happens
	* off screen what happens
* upload files what happens
* fill user values what happens
	* can still keep doing things after expectation and not have an error
	* capybara faciltaties 
* dropdown what happens


## Env 

#### Dropbox
|property|value|data|
|:------|:------:|------:|
|app name|capybara_angular_example||
|access|full access||
|access_token|your access token here||
||||


## Resources

[REST API](https://www.dropbox.com/developers/documentation/http/documentation#files-upload)
[Jesus ruby api](https://github.com/Jesus/dropbox_api)
[Browser Blob API](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
[RSPEC docs](https://github.com/rspec/rspec-expectations)
[Capybar docs](https://rubydoc.info/github/teamcapybara/capybara/Capybara/Node/Finders)
[Ruby Selenium Docs](https://www.selenium.dev/selenium/docs/api/rb/Selenium.html)


