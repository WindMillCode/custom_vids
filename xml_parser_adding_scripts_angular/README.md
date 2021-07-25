
# XML Parser  and Adding Local Scripts in Angular

* after this lab your project shoud look like app.component.final.ts
* if issues restart lab from app.component.start.ts

## Start the Angular app
* download the frontend [here](https://github.com/WindMillCode/custom_vids/tree/master/xml_parser_adding_scripts_angular)
* open a terminal and head to project root and run this command
```ps1
cd AngularApp
npm install -s
npx ng serve  --open=true
```

## Required files
* open
xmlParser\src\app\app.component.ts

## Local Scripts

* in angular we dont need a cdn to load scripts that we want to include, apart from using .ts files and import them via es6 we can use angular.json,useful say reverse engineering  a script is not an option 

we head to angular.json and and the relative location of our scripts in our app to the scripts array in architect.build.options

in 'make availbable your script import' paste this code
```ts
declare global {
    var parseXml:(xmlStr:string)=>{}
}
```
now your local script is availble for use

## Parsing XML 
* api's have many data formats different and incompatible with the convetional JSON, one (which Micrsoft uses) is XML

this app simply takes a xml string (as it would ususally return) and uses the polyfill local script and prints out the property of each foor item in the breasfast menu

in 'practical application' replace with code
```ts
    parseMyXml:Function = ()=>{
        let xmlReady:any;
        xmlReady = parseXml(this.stringXml)
        this.items = Array.from(xmlReady.querySelector("food").children).map((x:any,i)=>{
            return x.tagName
        })
        this.ref.detectChanges()

    }
```

head to the frontend application to click the button and see it work

