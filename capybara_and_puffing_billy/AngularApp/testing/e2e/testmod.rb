module TestMod

	def TestMod.upload_file devObj
		sample_file = devObj[:sample_file]
		file_input = devObj[:file_input]
		begin
			file_input.attach_file sample_file
			# ,:make_visible => true
		rescue => exception
			# edge legacy will upload sample_files.length files other browser might just upload one check
			sample_file.each do |x|
				file_input.attach_file x,:make_visible => true
			end
		end
	end

end
