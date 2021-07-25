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
load  %{testmod.rb}
require %{dropbox_api}


# class Capybara::Selenium::Driver < Capybara::Driver::Base
# 	def reset!
# 		if @browser
# 			@browser.navigate.to('about:blank')
# 		end
# 	end
# end



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
Selenium::WebDriver.logger.level = :debug
Selenium::WebDriver.logger.output = %{selenium.log}
# Selenium::WebDriver.logger.output = 'C:\Users\oluod\My_Notebook\angular\v10\GNDC\CLT-GNDC\testing\issues\geckodriver_vv_option\default_profile_84_reset_vv_option.log'
Capybara.raise_server_errors = false
Capybara.run_server = false
Capybara.default_max_wait_time = 5
Capybara.ignore_hidden_elements = false



$client = nil


Capybara.register_driver :internetExplorer do |app|


	Capybara::Selenium::Driver.new(
		app,
		:browser => :internet_explorer,
		:options =>   Selenium::WebDriver::IE::Options.new({
			:ignore_zoom_levels => true,
			:ignore_zoom_setting => true,
			# :browser_attach_timeout => 1,
			:javascript_enabled => true,
			:persistent_hover => true,
			# :require_window_focus => true,
			:ignore_protected_mode_settings =>true,
			:ignore_zoom_level => false
		})
	)

end

Capybara.register_driver :firefox_profile do |app|
	desired_caps = Selenium::WebDriver::Remote::Capabilities.firefox
	# desired_caps[:firefox_profile] = %{file:///C:/Users/oluod/My_Notebook/angular/v10/GNDC/CLT-GNDC/testing/e2e/firefox_profile}
	# desired_caps[:firefox_profile] = %{C:/Users/oluod/My_Notebook/angular/v10/GNDC/CLT-GNDC/testing/e2e/firefox_profile}
	# desired_caps[:firefox_profile] = %{capybara}
	service = Selenium::WebDriver::Service.firefox :args => [%{-vv}]
	options = Selenium::WebDriver::Firefox::Options.new :args => [%{-profile=C:\\Users\\oluod\\My_Notebook\\angular\\v10\\GNDC\\CLT-GNDC\\testing\\e2e\\firefox_profile}]
  # options.profile = Selenium::WebDriver::Firefox::Profile.new %{C:\\Users\\oluod\\My_Notebook\\angular\\v10\\GNDC\\CLT-GNDC\\testing\\e2e\\firefox_profile}

  options.log_level = %{trace}
	Capybara::Selenium::Driver.new(
		app,
    :browser => :ff,
    :desired_capabilities => desired_caps,
		:options =>   options,
		:service => service
	)

end

Capybara.register_driver :edgeBrowser do |app|


	Capybara::Selenium::Driver.new(
		app,
		:browser => :edge,
		:desired_capabilities =>Selenium::WebDriver::Remote::Capabilities::edge({
			:javascript_enabled => true,
			:css_selectors_enabled => true,
		}),
	)

end

Capybara.register_driver :operaDriver do |app|

	Capybara::Selenium::Driver.new(
		app,
		:browser => :opera,
		:desired_capabilities =>Selenium::WebDriver::Remote::Capabilities::edge({
			:javascript_enabled => true,
			:css_selectors_enabled => true,
		}),
	)


end

RSpec.configure do |config|


	my_drivers = %i{ edgeBrowser internetExplorer selenium }
	# my_drivers = %i{ edgeBrowser }
  	# my_drivers = %i{ firefox_profile }
  	# my_drivers = %i{ selenium}
	# my_drivers = %i{ internetExplorer }
	hosts = Hash.new
	hosts[:dev] =  %{http://localhost:8000}
	# hosts[:homeowner_dev] =  %{http://localhost:4201}
  # hosts[:rental_prod] = %{https://www.guadalupendc.org/online-rental-housing-application}

	config.full_backtrace = false
	config.backtrace_exclusion_patterns = [
    /\/lib\d*\/ruby\//,
    /bin\//,
    /gems/,
    /spec\/spec_helper\.rb/,
    /lib\/rspec\/(core|expectations|matchers|mocks)/
  ]

	config.before :example do
		page.driver.quit
		begin
			page.driver.close_window page.windows.last.handle
		rescue => exception

		end
		visit %{/}
		page.current_window.maximize
		$client =  DropboxApi::Client.new %{AN-8rJ0XuEwAAAAAAAAAATUAu6uTWRtwFG8s7WOMmdIoHdYI4Ep2yYw3mOfh5MyO}
	end


	config.after :example do
		page.driver.quit
		begin
			page.driver.close_window page.windows.last.handle
		rescue => exception

		end
		#logout
	end

	config.around do |example|
		$example  = example
		my_drivers.each do |browser|
			hosts.each do |k,v|
				Capybara.current_driver = browser
				Capybara.app_host = v

				# unless example.metadata[:description].include? %{file} and browser == :selenium
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
				# end
			end
		end
	end
	config.after :suite do
		system %{takill /IM MicrosoftEdge.exe -F}
		system %{taskkill /IM MicrosoftWebDrivers.exe}
	end
end


def stagingTest
	@javascript

	RSpec.feature %{navigation stuff} , :skip => true  do
		scenario %{I can get to homepage} do
			visit %{/}
		end
	end

	RSpec.feature %{visual regression}    , :skip => true  do
		scenario %{dev view} do

			widths = %w{300  560  770  1020  1210}.collect &:to_i
			begin
				widths.each_with_index do |width,i|
					# page.fullscreen
					page.current_window.resize_to width, 800
					sleep 3
				end
			rescue => exception
				widths.each_with_index do |width,i|
					execute_script %Q{
						resizeTo(#{width},800)
					}
					sleep 3
				end
			end


		end
	end


	RSpec.feature %{UI frontend} , :skip => true    do
		scenario %{dropdown selection}  do
			dropdown = first %{.f_o_r_m_My-DropDown}
			dropdown.select_option
			last_option = all %{.f_o_r_m_My-DropDown_0}

			# Equivalence expextation
			expect(last_option.length).to eq(3)
			#

			# Regexp expectation
			last_option.each do |x|
				expect(x[:innerText]).to match(/NAME/)
			end
			#


			last_option[2].select_option
			expect(dropdown[:innerText]).to eq(%{NAME3})

		end

		scenario %{user fills form}  do
			inputs = all %{.a_p_p_Input}
			inputs.each do |x|
				x.fill_in  :with=> %{Myasia Jeliani} # or x.send_keys
				expect(x[:value]).not_to eq %{Tarik Fatum}
			end

			sleep 3
			(first %{.f_o_r_m_Submit}).select_option
			sleep 5

		end


	end

	RSpec.feature %{file upload } do

		scenario %{upload files}   do
			file_input = first %{input[type="file"]}
			sample_file = Dir[%{C:/Users/oluod/My_Notebook/angular/reserve/various_files/*}].sample
			sample_file = sample_file.gsub %{/},%{\\}

			TestMod.upload_file :sample_file => sample_file,:file_input => file_input

			# get the name of the file the UI reported
			ui_sucess = (first %{p}, :text => %{Waiting For Submission ...})
			sleep 3
			(first %{.f_o_r_m_Submit}).select_option
			sleep 5

			p ui_sucess[:innerText]



			result = ($client.search query = "abc.kpj",path = "")
			expect(result.start).to eq 0
			expect(ui_sucess[:innerText].include? (sample_file.split %{\\})[-1]).to be_truthy

		end
	end

end


stagingTest
