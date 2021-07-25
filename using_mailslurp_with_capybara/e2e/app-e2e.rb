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

#

# RSpec configs
RSpec.configure do |config|


  # silence verbose errors 
  
  # 

  # lifecycle hooks
  
  #


end
#



def stagingTest

  RSpec.feature  %{mailslurp} do

    scenario %{create an account} do

      # init 

      # 

      # create an account

      # 

      # get your code

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
