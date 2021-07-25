## Code for video

```rb

		scenario %{in the first display make sure that duplication is done properly} do
			first_display = all %{[class*="display1"]}
			PP.pp first_display.size

			add = first %{[class*="add-1"]}
			rand(2..3).times do |x|
				add.click
			end


			add = {
				:elements => (all %{[class*="display1"]}),
				:sorted =>[],
				:vertical => -1
			}
			add[:elements].each_with_index do |x,i|
				unless i%6 != 0
					add[:sorted].push []

				else

				end
				add[:sorted][add[:sorted].size-1].push x.style(%{top},%{left})

				unless add[:sorted].size <=	 1
					current =  add[:sorted][add[:sorted].size-1]
					previous = add[:sorted][add[:sorted].size-2]
					current_top = (numberParse :dimension => (current.at (current.size - 1) )[%{top}]).to_i
					previous_top = (numberParse :dimension => (previous.at (current.size - 1) )[%{top}]).to_i

					current_left = (numberParse :dimension => (current.at (current.size - 1) )[%{left}]).to_i
					previous_left = (numberParse :dimension => (previous.at (current.size - 1) )[%{left}]).to_i
					unless add[:vertical] != -1
						add[:vertical] = current_top - previous_top
					end
					# expect the tops to be the same distance
					expect(current_top - previous_top).to be_within(2).of(add[:vertical])

					# expect the lefts to be equal
					expect(current_left).to eq(previous_left)
				end
			end
			PP.pp add[:sorted]


		end
```