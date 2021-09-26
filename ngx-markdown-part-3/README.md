
# Ngx-markdown
* after this lab your project shoud look like AngularAppFinal
* if issues restart lab from AngularAppStart

## Start the Angular app
* download the frontend [here](https://downgit.github.io/#/home?url=https://github.com/WindMillCode/Facebook_Project/tree/master/AngularApp)
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
## Part 3

### Emoji support 
* __FILE AngularApp\angular.json__
* in 'part 3' replace with this code
```json
"node_modules/emoji-toolkit/lib/js/joypixels.min.js",
```
* restart the app


* __FILE AngularApp\src\app\app.component.html__
* replace with this code 
```html
<div class="a_p_p_MdView" >
    <markdown
    emoji

    lineNumbers
    [start]="1"

    lineHighlight
    [line]="'1, 4-5'"
    [lineOffset]="2"

    [data]=markdown.data   >

    </markdown>
</div>

```

### KaTeX support
* KaTeX is about rendering mathematical expressions

* __FILE AngularApp\angular.json__
* in 'part 3' replace with this code
```json
"node_modules/emoji-toolkit/lib/js/joypixels.min.js",
"node_modules/katex/dist/katex.min.js"
```

* in 'part 3 css' replace with this code
```json
"node_modules/katex/dist/katex.min.css"
```

* __FILE AngularApp\src\app\app.component.ts__
* in 'paste KaTeX options here' paste
```ts
        katexOptions: {
            displayMode: true,
            throwOnError: true,
            errorColor: '#cc0000',
        }
```

[reference](https://katex.org/)

* __FILE AngularApp\src\app\app.component.html__
* paste this code
```html
<div class="a_p_p_MdView" >
    <markdown
    emoji
    katex
    [katexOptions]=markdown.katexOptions

    lineNumbers
    [start]="1"

    lineHighlight
    [line]="'1, 4-5'"
    [lineOffset]="2"

    [data]=markdown.data   >

    </markdown>
</div>

```