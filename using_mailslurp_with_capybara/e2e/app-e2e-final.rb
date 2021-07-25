# require %{em/pure_ruby}
require %{capybara}
require %{capybara/dsl}
require %{capybara/rspec}
require %{capybara/rspec/matcher_proxies}
require %{rspec/expectations}
require %{rails_helper}
require %{percy}
require %{selenium/webdriver}
require %{selenium-webdriver}
require %{net/http}
require %{rest-client}
require %{json}
require %{pp}
require %{uri}
# require %{billy/capybara/rspec}
# load  %{testmod.rb}


# dev additions
require %{rotp}
require %{mailslurp_client}
require %{table_print}
#



# dev setup

class Capybara::Node::Element
  def select_option(wait: nil)
    begin
      raise 's'
        rescue => exception
      scroll_to self
      synchronize(wait) { base.click }
      self
    end
  end
end
# Selenium::WebDriver.logger.level = :debug
# Selenium::WebDriver.logger.output = %{selenium.log}
Capybara.raise_server_errors = false
Capybara.run_server = false
Capybara.default_max_wait_time = 5
Capybara.ignore_hidden_elements = false
Capybara.javascript_driver = :selenium_chrome_billy





# Mailslurp configuration
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

#

# RSpec configs
RSpec.configure do |config|


  # silence verbose errors 
  config.full_backtrace = false
  config.backtrace_exclusion_patterns = [
      /\/lib\d*\/ruby\//,
      /bin\//,
      /gems/,
      /spec\/spec_helper\.rb/,
      /lib\/rspec\/(core|expectations|matchers|mocks)/
  ]  
  # 

  # lifecycle hooks
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
  #


end
#



def stagingTest

  RSpec.feature  %{mailslurp} do

    scenario %{create an account} do

      # init 
      inbox = $inbox 
      accounts = $accounts
      wait_controller = $wait_controller
      # 

      # create an account
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
      # 

      # get your code
      email = wait_controller.wait_for_latest_email({ :inbox_id => inbox.id, :unread_only => true, :timeout => 30_000 })
      expect(email.subject).to include %{Your verification code}
      match = email.body.match /code is ([0-9]{6})/
      if match == nil then
        raise %{Could not find match in body #{email.body}}
      end
      conf_code, * = match.captures
      expect(conf_code).to be_truthy  
      p conf_code      
      # 

    end


  end

end



def numberParse  devObj
    dimension = devObj[:dimension]
    (dimension.split %{px}).at 0
end


def capybara_result_to_array devObj
	arr = []
	devObj[:target]
	.each do |x|
		arr.push x
	end
	arr
end


stagingTest
