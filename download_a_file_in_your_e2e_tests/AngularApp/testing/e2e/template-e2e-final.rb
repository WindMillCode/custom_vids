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


# include the module
require_relative %{./downloadhelpers.rb}
include DownloadHelpers
#


# dev setup
Capybara.raise_server_errors = false
Capybara.run_server = false
Capybara.default_max_wait_time = 20
Capybara.ignore_hidden_elements = false
# Capybara.javascript_driver = :selenium_chrome_billy

$client = nil

# dev additions
$timeouts = Hash[
  :load_page => Hash[
      :chrome_billy => 2,
      :firefox_billy => 1,
  ],
]
#

Capybara.register_driver :chrome_billy do |app|

  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument %{--disable-infobars}
  options.add_argument %{--disable-notifications}
  options.add_argument %{--start-maximized}
  options.add_argument %{--no-sandbox}
  options.add_argument %{--disable-gpu}
  options.add_argument %{--disable-dev-shm-usage}

  #configure the browser to allow for automatic download
  options.add_preference :download, prompt_for_download: false, default_directory: DownloadHelpers::PATH.to_s
  options.add_preference :browser, set_download_behavior: { behavior: 'allow' }
  #


  Capybara::Selenium::Driver.new(
    app,
    :browser => :chrome,
    :options => options,
    :clear_local_storage => true,
    :clear_session_storage => true
  )

end

# RSpec configs
RSpec.configure do |config|

	my_drivers = %i{chrome_billy}
	hosts = Hash.new
	hosts[:dev] =  %{http://localhost:4202}

	config.full_backtrace = false
	config.backtrace_exclusion_patterns = [
			/\/lib\d*\/ruby\//,
			/bin\//,
			/gems/,
			/spec\/spec_helper\.rb/,
			/lib\/rspec\/(core|expectations|matchers|mocks)/
	]

  config.before :example do

    visit %{/}

    begin
      page.current_window.maximize
    rescue
      nil
    end

    # dev additions

    #

    sleep $timeouts[:load_page][Capybara.current_driver.to_sym]



  end

  config.after :example do

    # dev additions

    #

  end

  config.around do |example|
    $example  = example
    my_drivers.each do |browser|
      Capybara.current_driver = browser


      hosts.each do |k,v|
        Capybara.current_driver = browser
        Capybara.javascript_driver = Hash[
          :chrome_billy => :selenium_chrome_billy,
          :firefox_billy =>:selenium_billy
        ][browser.to_sym]

        Capybara.app_host = v
        # A Identifying and running each scenario
          # PP.pp example.metadata
        p Capybara.app_host.to_s +  %{ in } + Capybara.current_driver.to_s
        p %{scenario #{example.metadata[:description]}}
        begin
          example.run
        rescue => exception
          page.driver.quit
        end
        # A
      end
    end
  end

  config.before :suite do
    # dev additions
    clear_helper_downloads
    #
  end

  config.after :suite do
    # dev addtions

    #

  end
end
#


def stagingTest
@javascript

  RSpec.feature  %{staging} do

    # downloading test
    scenario %{when the user clicks download we get a pdf} do
        my_download = find %{a},:text => %{Download PDF}
        my_download.click
        wait_for_helper_download
        expect(helper_downloads.length).to eq 1
        expect(helper_download).to match /my_file.pdf/
        sleep 10
      end
    #

  end

end

stagingTest
