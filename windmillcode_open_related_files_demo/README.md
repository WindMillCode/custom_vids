# Windmillcode Open Related Files

[Youtube URL](https://www.youtube.com/watch?v=ZBjVapDAOk0)
[Github URL](https://github.com/WindMillCode/custom_vids/tree/master/windmillcode_open_related_files_demo)

## Step 1
* Download and install the extension from the [extension marketplace]( https://marketplace.visualstudio.com/items?itemName=windmillcode-publisher-0.windmillcode-open-related-files)

* then download and open the folder in a new vscode [workspace](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/WindMillCode/custom_vids/tree/master/windmillcode_open_related_files_demo)

* open Header.js in the editor
* then HeaderView.js
* then styles.js

* now close everyhting and open
* WidgetView.js
* Widget.js
* styles.js

see how difficult that is

## Step 2
__FILE__  .vscode\settings.json
```json
  "windmillcode-open-related-files": {
    "options": [
      {
        "name": "React Development",
        "searchPaths": ["apps/frontend/react-material-admin"],
        "fileRegexPredicate": "(?<!styles)\\.(js)$",
        "setEditorLayout": {
          "orientation": 1,
          "groups": [
            {
              "groups": [{}, {}],
              "size": 0.5
            }
          ]
        },
        "includeGlobs": [
          [
            [
              "**/src/components/FILE_NAME_BASIS/FILE_NAME_BASIS.js",
            ],
            [
              "**/src/components/FILE_NAME_BASIS/styles.js",
              "**/src/components/FILE_NAME_BASIS/FILE_NAME_BASISView.js",
            ]
          ]
        ]
      },
      {
        "name": "Spring Boot Development",
        "searchPaths": ["apps/backend/ewallet/src"],
        "fileRegexPredicate": "\\.(java|xml)$",
        "setEditorLayout": {
          "orientation": 1,
          "groups": [
            {
              "groups": [{}, {}],
              "size": 0.5
            },
            {
              "groups": [{}],
              "size": 0.5
            }
          ]
        },
        "includeGlobs": [
          [
            [
              "**/main/java/**/model/FILE_NAME_BASIS.java",
            ],
            [
              "**/main/java/**/dto/FILE_NAME_BASISDTO.java",
              "**/main/java/**/repository/FILE_NAME_BASISRepository.java"
            ]
          ],
          [
            [
              "**/main/java/**/response/FILE_NAME_BASISResponse.java",
              "**/main/java/**/service/FILE_NAME_BASISService.java",
            ]
          ]
        ]
      },
      {
        "name": "Ruby on Rails Development",
        "searchPaths": ["apps/backend/ruby_on_rails_app/"],
        "fileRegexPredicate": "\\.(rb|html.erb)$",
        "setEditorLayout": {
          "orientation": 1,
          "groups": [
            {
              "groups": [{}],
              "size": 0.5
            },
            {
              "groups": [{}, {}],
              "size": 0.5
            },
            {
              "groups": [{} , {} ,{},{},{}],
              "size": 0.5
            },
            {
              "groups": [{},{}],
              "size": 0.5
            },
          ]
        },
        "includeGlobs": [
          [
            [
              "**/app/models/**/FILE_NAME_BASIS.rb",
            ]
          ],
          [
            [
              "**/app/controllers/**/FILE_NAME_BASIS_controller.rb"
            ],
            [
              "**/app/views/**/FILE_NAME_BASIS/_FILE_NAME_BASIS.html.erb",
              "**/app/views/**/FILE_NAME_BASIS/index.html.erb"
            ]
          ],
          [
            [
              "**/app/helpers/FILE_NAME_BASIS_helper.rb",
            ],
            [
              "**/app/jobs/FILE_NAME_BASIS_job.rb",
            ],
            [
              "**/app/mailers/FILE_NAME_BASIS_mailer.rb",
            ],
            [
              "**/app/mailers/FILE_NAME_BASIS_mailer.rb",
            ],
            [
              "**/app/helpers/FILE_NAME_BASIS_helper.rb",
            ],
          ],
          [
            [
              "**/test/**/controllers/FILE_NAME_BASIS_controller_test.rb"
            ],
            [
              "**/test/**/models/FILE_NAME_BASIS_test.rb"
            ]
          ]
        ]
      }


    ]
  }
```


* Open Command Pallete
[Ctrl+Shift+P] for Windows
[CMD+Shift+P] for Mac
select __Windmillcode Open Related Files: Set Default Option__
select __React Developent__



## Step 3

* Open Command Pallete
[Ctrl+Shift+P] for Windows
[CMD+Shift+P] for Mac

now go back to Header.js
* Open Command Pallete
[Ctrl+Shift+P] for Windows
[CMD+Shift+P] for Mac

select __Windmillcode Open Related Files: Open__

* see how all the related files open up

## Step 4

to automate it every time you click on a new file

* Open Command Pallete
[Ctrl+Shift+P] for Windows
[CMD+Shift+P] for Mac

select __Windmillcode Open Related Files: Toggle Auto Open__
select YES

* now open Header.js (all related files open)
* now select Widget.js (all related files open)
* now select Sidebar.js (all related files open)

* if you notice that it may not activate just do

* Open Command Pallete
[Ctrl+Shift+P] for Windows
[CMD+Shift+P] for Mac

select __Windmillcode Open Related Files: Open__
this is usually because you had the related file open, as a mechanism to prevent files from opening continuously


## Step 5

* to unclutter we want to reset the layout

* Open Command Pallete
[Ctrl+Shift+P] for Windows
[CMD+Shift+P] for Mac

select __Windmillcode Open Related Files: Toggle Reset Layout__
select YES

* now open Header.js (the layout resets then all related files open)
* now select Widget.js (the layout resets then all related files open)
* now select Sidebar.js (the layout resets then all related files open)

## Step 6

* we may need a more complex layout

* Open Command Pallete
[Ctrl+Shift+P] for Windows
[CMD+Shift+P] for Mac
select __Windmillcode Open Related Files: Set Default Option__
* select __Spring Boot Development__

open the file ```Balance.java```
see how the following files open up in a format

BalanceDTO.java
BalanceRepository.java
BalanceResponse.java
BalanceService.java

we specify the layout like so
```json
  "setEditorLayout": {
    "orientation": 1,
    "groups": [
      {
        "groups": [{}, {}],
        "size": 0.5
      },
      {
        "groups": [{}],
        "size": 0.5
      }
    ]
  },
```
orientation 0 is top to bottom leftward (veritcal)
orientation 1 is left to right downward (downard)
and editor group is empty space
that means 2 editor groups as the first row and 1 editor group on the second row
we can specify the size for each group but for the respective groups they should all add up to one
we can fill the objects with the properies of the parent (watch the video if you dont understand)


## Step 7


* the include globs are the files to open and they need to have the same matrix dimension as set setEditorLayout.groups
```json
        "includeGlobs": [
          [
            [
              "**/main/java/**/model/FILE_NAME_BASIS.java",
            ],
            [
              "**/main/java/**/dto/FILE_NAME_BASISDTO.java",
              "**/main/java/**/repository/FILE_NAME_BASISRepository.java"
            ]
          ],
          [
            [
              "**/main/java/**/response/FILE_NAME_BASISResponse.java",
              "**/main/java/**/service/FILE_NAME_BASISService.java",
            ]
          ]
        ]
```
* see the arragement of how the editor groups corresponds
```json
[
  [
    [],[]
  ],
  [
    []
  ]
]
```
if its not exact it still okay
 if one too little respective group are missing it will leave the editor groups blank
 if one too many  respective groups are missing it will create new editor groups likely or likely not according to the matrix dimensions of  includeGlobs

* remove and the strings in different array dimension and and see the files get open according to your array dimensions



## Step 8
* change "orientation": 1, for the object with the name property of  "Spring Boot Development"

now open Transaction.java (see how the layout opens different from before)

## Step 9
update the groups to be
```json
  "setEditorLayout": {
    "orientation": 1,
    "groups": [
      {
        "groups": [
          {
            "size":0.8
          },
          {
            "size":0.2
          }
          ],
        "size": 0.7
      },
      {
        "groups": [{}],
        "size": 0.3
      }
    ]
  },
```
* the editors may not open always with the intended sizes

## Step 10
Service files can be rather big say we want to get to  a certain section rather than the top of the file

replace include Globs for the "Spring Boot Development", with this
```json
[
  [
    [
      "**/main/java/**/model/FILE_NAME_BASIS.java",
    ],
    [
      "**/main/java/**/dto/FILE_NAME_BASISDTO.java",
      "**/main/java/**/repository/FILE_NAME_BASISRepository.java"
    ]
  ],
  [
    [
      "**/main/java/**/response/FILE_NAME_BASISResponse.java",
      {
        "filePath":"**/main/java/**/service/FILE_NAME_BASISService.java",
        "section": [29, 0, 44, 0]
      }
    ]
  ]
]
```

* see now how for the serice it opens to the appropriate section
(even though you may want different section for every service file were open to suggestions )

## Step 11

* there are no limits
* Open Command Pallete
[Ctrl+Shift+P] for Windows
[CMD+Shift+P] for Mac
select __Windmillcode Open Related Files: Set Default Option__
* select __Ruby on Rails Development__
* view the matrix dimensions for  setEditorLayout and includeGlobs rather big
* select application.rb  ( notice how all the files open and if a relative file cannot be find it skips over and continues)
* select article.rb (its still able to pull it off)

* may not be useful on a desktop but those with projects or massive screes you will feel the difference

## Step 12
* we may want to open
```
application_controller.rb
OR
application_helper.rb
OR
application_job.rb
OR
application_mailer.rb
```
but we dont know the regex
instead of trying to create a regex chatgpt 4 cant even do
we can leverage substring removal array

in the
"name": "Ruby on Rails Development",

replace
```json
fileRegexPredicate": "\\.(rb|html.erb)$",
```
with
```json
        "subStringRemovalArray":[
          "_controller.rb",
          ".html.erb",
          "_helper.rb",
          "_job.rb",
          "_mailer.rb",
          "_controller_test.rb",
          "_test.rb",
          ".rb"

        ]
```
* what is does is it removes all of the prefixes and suffixes from the fileName to get that same relationship string that fileRegexPredicate does now open

 article_controller.rb
 search_helper.rb
 application_mailer.rb

and see how everyhing works!


