
# Mailslurp API with Ruby and Python

* after this lab your project shoud look like app-e2e.final.rb
* if issues restart lab from app-e2e.start.rb

## Start the Python backend
* download the project here [here](https://downgit.github.io/#/home?url=https://github.com/WindMillCode/custom_vids/tree/master/using_mailslurp_with_capybara)
* you need to set the python backend to run aws  
[here](https://www.youtube.com/watch?v=YuP4C5jaltY)

* else send a random confirmation code message to the target email
```txt
Subject: Your verification code


Body: Your confirmation code is 047322
```

## Required files 
* e2e/app-e2e.rb
* set_testing_env.sh  | set_testing_env.ps1

## Setup the Ruby Testing Env 
* head to ./project_root/e2e
* there run
	* in windows you may need to change the deps in the Gemfile, send out an issue basically saying "bundle install not working on windows"
```ps1
bundle install
```

### Configure the Mailslurp API 
* head to the Mailslurp account dashboard and there is your API KEY

__FILE set_testing_env.sh__
* for the MAILSLURP_API_KEY 
```sh
MAILSLURP_API_KEY=replace with mailslurp api key
```

* create a new inbox
[inboxes]-> [create inbox] -> 

* grab the inbox id

* for the MAILSLURP_INBOX_ID 
```sh
MAILSLURP_INBOX_ID=replace with inbox id
```

__FILE e2e/app-e2e.rb__
in 'Mailslurp configuration' paste this code
	* we have to make sure the api is there our we might get a cryptic message
	* then we provide for an accounts hash to assoicate our needed metadata
```rb
MailSlurpClient.configure do |config|
  api_key = ENV[%{MAILSLURP_API_KEY}]
  if api_key == %{} or api_key == nil then
    raise %{No API_KEY environment variable set for MailSlurp API KEY}
  end
  config.api_key[%{x-api-key}] = api_key
end


$accounts = Hash[

  
    :inbox_string => ENV[%{MAILSLURP_INBOX_ID}], 
    :pass => %{Apples123456},
    :change_pass => %{123456Apples},
    :access_token => nil,
    :totp => nil
  
]
$inbox_controller = MailSlurpClient::InboxControllerApi.new
$wait_controller = MailSlurpClient::WaitForControllerApi.new
$inbox = $inbox_controller.get_inbox $accounts[:inbox_string]


```

### Your e2e testing script
 
* in 'silence verbose errors paste this code'
	* if we get a mistake we rather pp it our selves then see the ridiculous backtrace that goes into the ruby gem internals unrelated to our tests
```rb
config.full_backtrace = false
config.backtrace_exclusion_patterns = [
		/\/lib\d*\/ruby\//,
		/bin\//,
		/gems/,
		/spec\/spec_helper\.rb/,
		/lib\/rspec\/(core|expectations|matchers|mocks)/
]
```


RSpec has lifecycle hooks if you will and you need to work with these in order to properly build up and teardown your test so you can emulate the end users experience as close as possible 

* in 'lifecycle hooks' paste this code 
	* the most important one is config.around it gives each of the scenarios in our feature test groups as example and in order to test we need 
	``` example run```
	* we make the hooks practical by deleteing the account once the whole testing suite is finished
	[resources](https://rubydoc.info/gems/rspec-core/RSpec/Core/Hooks)
```rb	
  config.around do |example|
    example.run
  end 

  config.after :suite do
    # init 
    inbox = $inbox 
    accounts = $accounts
    # 

    payload = Hash[
      :env =>%{adminDeleteAcct},
      :user => inbox.email_address
    ]
    headers = Hash[:Origin => %{http:localhost:4521},:Content_Type => %{application/json}]
    begin
      RestClient.post("http://localhost:3006", payload=payload.to_json, headers=headers)
    rescue => exception
      p exception
    end
  end  
```

### Your first integration test
* in 'init' paste this code
```rb
      inbox = $inbox 
      accounts = $accounts
      wait_controller = $wait_controller
```

* called integration because we are working with a 3rd party, really there would be a login setup on the frontend and the frontend with do the XHR to mailslurp, we mimick it by just sending the metadata to the python endpoint instead

* in 'create an account' paste this code
```rb
      payload = Hash[
        :env =>%{createAccount},
        :user => inbox.email_address,
        :pass => accounts[:pass]
      ]
      headers = Hash[:Origin => %{http:localhost:4521},:Content_Type => %{application/json}]
      begin
        RestClient.post("http://localhost:3006", payload=payload.to_json, headers=headers)
      rescue => exception
        p exception
      end
```

* we implement the wait_controller in order to get the  latest email and parse out the regex to get out code

in 'get your code' paste this code
```rb
      email = wait_controller.wait_for_latest_email({ :inbox_id => inbox.id, :unread_only => true, :timeout => 30_000 })
      expect(email.subject).to include %{Your verification code}
      match = email.body.match /code is ([0-9]{6})/
      if match == nil then
        raise %{Could not find match in body #{email.body}}
      end
      conf_code, * = match.captures
      expect(conf_code).to be_truthy  
      p conf_code
```



