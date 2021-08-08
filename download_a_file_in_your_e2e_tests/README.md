
# Automate File Download in your E2E Tests

* after this lab your project shoud look like template-e2e-final.rb
* if issues restart lab from template-e2e-start.rb

## Start the Angular app
* download the frontend [here](https://downgit.github.io/#/home?url=https://github.com/WindMillCode/custom_vids/tree/master/download_a_file_in_your_e2e_tests/AngularApp)
* open a terminal and head to project root and run this command
```ps1
cd AngularApp
npm install -s
npx ng serve 
```


## Required files
* open
AngularApp\testing\e2e\template-e2e.rb


## DownloadHelpers

* capybara is like React, for certain resources you need to grab libraries or make your own

* in 'include the module' paste this code
	* if your look in the e2e directory you will find the requried code
```rb 
require_relative %{./downloadhelpers.rb}
include DownloadHelpers
```

## Browser Options
* in e2e testing we rarely use the stock binary for the browser and for the driver
* if we left as is chrome browser will prompt a user for the download, capybara cannot handle that

 * in 'configure the browser for allow for automatic download'paste this code
```rb
  options.add_preference :download, prompt_for_download: false, default_directory: DownloadHelpers::PATH.to_s
  options.add_preference :browser, set_download_behavior: { behavior: 'allow' }
```

## Test the user gets their file when dowloaded 
* in HTML when we set the download attribute, we change the name from orginial name in the cdn 

in 'dowloading test' paste this code
```rb
    scenario %{when the user clicks download we get a pdf} do
      my_download = find %{a},:text => %{Download PDF}
      my_download.click
      wait_for_helper_download
      expect(helper_downloads.length).to eq 1
      expect(helper_download).to match /my_file.pdf/
      sleep 10
    end
```



