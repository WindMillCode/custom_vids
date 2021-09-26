
# Ngx-markdown
* after this lab your project shoud look like AngularAppFinal
* if issues restart lab from AngularAppStart

## Start the Angular app
* download the frontend [here](https://downgit.github.io/#/home?url=https://github.com/WindMillCode/custom_vids/tree/master/ngx-markdown-part-2
)
* open a terminal and head to project root and run this command
```ps1
cd AngularApp
npm install -s
npx ng serve --open=true
```


## Required files
* open
AngularApp\src\app\app.component.html
AngularApp\src\app\app.component.ts
AngularApp\src\app\app.module.ts


### Configure the Module

__FILE app.module.ts__ -

* in 'import the markdown module' paste this code
```ts
MarkdownModule.forRoot()
```

### Paste your markdown data
__FILE app.component.ts__ -

* in paste markdown here paste this code

```ts
	data:`
	# Structure

	## Linting Rules
	* for each commit, we append "WORKING COMMIT" so we know the commit is free of bugs
	* ruby indentation 2 lines
	* ts indentation 4 lines


	## Project Directory Mapping

	### Frotend
	#### Configurations
	* we use __JudimaApp/src/envrionments__ - for dev and prod frontend configurations we includes configuations for features in the app
	`
```

### Use the component

__FILE app.component.html__ -
paste the code like so
```html

<div class="a_p_p_MdView" >
    <markdown [data]=markdown.data   >

    </markdown>
</div>


```
## Part 2
### Add the code snippets plugin
__FILE AngularApp\angular.json__
* in 'part 2 css' paste this code
```json
"node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css",
"node_modules/prismjs/plugins/line-highlight/prism-line-highlight.css"
```

* in  'part 2 js' paste this code
```json
"node_modules/prismjs/components/prism-python.min.js",
"node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js",
"node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js"
```

* more themes and components are avaiable in themes and components


### Add line numbers like so
__FILE AngularApp\src\app\app.component.html__

* replace the file with this code
```html
<div class="a_p_p_MdView" >
    <markdown

    lineNumbers
    [start]="1"

    [data]=markdown.data   >

    </markdown>
</div>

```

### Add line highlight
__FILE app.component.html__ -
replace the code like so
```html
<div class="a_p_p_MdView" >
    <markdown

    lineNumbers
    [start]="1"


    lineHighlight
    [line]="'1, 4-5'"
    [lineOffset]="2"

    [data]=markdown.data   >

    </markdown>
</div>

```
