	RSpec.feature %{navigation}  do


		scenario %{test that as you navigate the pages are the same when you leave as when you come} do

			elements = Hash.new
			20.times do |x|
				navigation = all %{p[class*='main-navigation'] }
				current = navigation.sample
				navigation_text = current.text

				current.click
				unless elements[navigation_text] != nil

					#  still comes up with auto
					# PP.pp execute_script %Q{
					# 	return Array.from(document.querySelectorAll("*"))
					# 	.map((x,i)=>{
					# 		# return {
					# 		# 	top: getComputedStyle(x)["top"],
					# 		# 	left:getComputedStyle(x)["left"]
					# 		# }
					# 	})
					# }
					#

					p navigation_text

					# page modifers
					if navigation_text == %{Blog}
						controls = all %{.a_p_p_Button}
						10.times do
							sleep 0.5
							controls.sample.click
						end
					elsif navigation_text == %{Home}
						dropdowns = dropdownSelectSelector
						5.times do
							dropdowns.sample.click
						end

					end
					#

					elements[navigation_text] = navigationPage
				else
					p %{#{navigation_text} found a match}
					new_navigation =  navigationPage

					# test the top left of the old against the top left of the new
					elements[navigation_text].each_with_index do |x,i|
						expect(x).to eq new_navigation[i]
					end
					#

					# once the test passes make the new navigation the current
					if navigation_text == %{Blog}
						controls = all %{.a_p_p_Button}
						10.times do
							sleep 0.5
							controls.sample.click
						end
					elsif navigation_text == %{Home}
						dropdowns = dropdownSelectSelector
						5.times do
							dropdowns.sample.click
						end

					end
					new_navigation = navigationPage
					elements[navigation_text] =  new_navigation
					#

				end


			end

		end

	end