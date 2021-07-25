# Dropdown e2e testing with Angular and Capybara

## Top level dropdown
## test that the select value is above the other options when open

```rb
		scenario %{test that the select value is above the other options when open} do
			select = first %{.f_o_r_m_my-dropdown-latch-dropdown-base}
			options = (capybara_result_to_array :target => (all %{.f_o_r_m_my-dropdown-latch-dropdown-base})      )
			options = options.slice(1,4)
			select.click
			value = select.style(%{top},%{height})
			value["top"]=    (numberParse :dimension =>value["top"]).to_f
			value["height"]= (numberParse :dimension =>value["height"]).to_f
			tops = {
				:values =>[value ]
			}
			options
			.each do |x|
				# execute_script %Q{
				# 	return Array.from(document.querySelectorAll(".f_o_r_m_my-dropdown-latch-dropdown-base")).slice(1)
				# 	.forEach((x,i)=>{
				# 		x.style["background-color"] = "red"
				# 	})
				# }
				value = x.style(%{top},%{height})
				value["top"]=    (numberParse :dimension =>value["top"] ).to_f
				value["height"]= (numberParse :dimension =>value["height"] ).to_f
				tops[:values].push(
					value
				)
			end

			tops[:values]
			.each_with_index.inject do |acc,x,i|

				p %{\\n}
				my_acc = acc
				.collect do |x|
					x[0]
				end
				p acc,my_acc,x
				p %{\\n}

				# make sure height of select and options are equal
					# make sure the select elements are stack one after another
				unless x[1]== 1
					expect(x[0]["height"]).to eq (my_acc.reverse[0]["height"])
					expect(x[0]["top"]).to be_within(2).of(my_acc.reverse[0]["height"] + my_acc.reverse[0]["top"])
				else
					expect(x[0]["height"]).to eq (acc[0]["height"])
					expect(x[0]["top"]).to be_within(2).of(acc[0]["height"] + acc[0]["top"])

				end
				#

				p acc,x # turns acc to array purshing values along
			end

		end
```

## test that when you click an option,select gets updated,dropdown closes

```rb
		scenario %{test that when you click an option,select gets updated,dropdown closes} do
			# select gets updated with the chosen option
			select = first %{.f_o_r_m_my-dropdown-latch-dropdown-base}
			select_text = select[:text]
			options = (capybara_result_to_array :target => (all %{.f_o_r_m_my-dropdown-latch-dropdown-base})      )
			options = options.slice(1,4)
			select.click
			item_to_click = {
				:element => options.sample
			}
			item_to_click[:element].click
			expect( item_to_click[:element][:text]).to eq(select[:text])
			#

			# dropdown closes
			options
			.each_with_index do |x,i|
				unless i == 0
					expect(x.style(%{top},%{height})).to eq(options[i-1].style(%{top},%{height}))
				end
			end
			#

			# update to the orgininal select al
			select.click
			item_to_click[:element].click
			expect( select_text).to eq(select[:text])
			#

			# dropdown closes
			options
			.each_with_index do |x,i|
				unless i == 0
					expect(x.style(%{top},%{height})).to eq(options[i-1].style(%{top},%{height}))
				end
			end
			#


		end
```

### test with other elements, when open it at least displays over other components

```rb
		scenario  %{test with other elements, when open it at least displays over other components} do
			select = first %{.f_o_r_m_my-dropdown-latch-dropdown-base}
			options = capybara_result_to_array :target => (all %{.f_o_r_m_my-dropdown-latch-dropdown-base})
			options = options.slice(1,4)
			select.click

			Capybara.ignore_hidden_elements = true
			options
			.each do |x|
				x.click
				select.click
			end
			Capybara.ignore_hidden_elements = false

		end
```

## Nested Dropdown

### test that all elements part of the dropdown are in the required container

```rb
		scenario %{test that all elements part of the dropdown are in the required container} do
			dropdown = capybara_result_to_array :target => (all %{.f_o_r_m_my-first-dropdown-latch-dropdown-nesting})
			container = first %{.f_o_r_m_my-first-dropdown-latch-dropdown-nesting-container}
			dropdown
			.each do |x|
				expect(x.find(:xpath, '..')).to eq(container)
			end

```

###  test with other elements, when open it at least displays over other elements
```rb
		scenario  %{test with other elements, when open it at least displays over other elements} do
			select = first %{.f_o_r_m_my-first-dropdown-latch-dropdown-nesting}
			options = capybara_result_to_array :target => (all %{.f_o_r_m_my-first-dropdown-latch-dropdown-nesting})
			options = options.slice(1,10)
			nest_container = first %{.f_o_r_m_my-overlay-latch-dropdown-nesting}
			select.click

			Capybara.ignore_hidden_elements = true
			options
			.each do |x|
				begin
					x.click
					select.click
				rescue => exception
					# never gets here because e2e is smart enough to scroll there and see it
					nest_container.scroll_to :align => :bottom
					x.click
					p x[:text]
					select.click
				end
			end
			Capybara.ignore_hidden_elements = false

		end
```