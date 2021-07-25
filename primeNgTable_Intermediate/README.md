
# Intermediate Lab to Working with PrimeNg Table

* after this lab your project shoud look like app.component.final.ts
* if issues restart lab from app.component.start.ts

## Start the Angular app
* download the frontend [here](https://github.com/WindMillCode/custom_vids/tree/master/primeNgTable_Intermediate)
* open a terminal and head to project root and run this command
```ps1
cd AngularApp
npm install -s
npx ng serve --open=true
```


## Required files
* open
primeNgTable\src\app\app.component.ts
primeNgTable\src\app\app.component.html

## Loading columns 
* with the templates in the primeNg library, you can be dynamic with data structure, so you data can come in any form when you are making  fetch requests

* primeNg uses special let syntax so you dont need to work about result$ | async, 
set the target array equal to the value attribute of p-table 

* static retrieveal would be a simple assignment
* in 'dynamicially retreive table data' paste this code
```ts
        let myXHRData = Array(127).fill(null)
        .map((x:any,i)=>{
            return {
                Name:Faker.Name.firstName() + " " + Faker.Name.lastName(),
                // add image urls
                Avatar:["angular","capybara","ga","ruby","xml"]
                .map((x:any,i)=>{
                    return "assets/media/"+x+".png"
                })[Math.floor(Math.random()*5)],
                //
                City:Faker. Address.city(),
                State:Faker.Address.usState(true),
                Zipcode:Faker.Address.zipCode()
            }
        })



        of([]) // a sample XHR for the data
        // this.http.get("mydataTableofArrays.json")
        .subscribe({
            next:(result:any)=>{
                this.value = myXHRData
            },
            error:(err:any)=>{

            }
        })
``` 

## adding images to columns
__FILE__ app.component.html

* say if we want to load images as row entries in our table, we can use the features of angular structural directives to achieve our task,

 * look at 'image ngSwitch here'

* we setup as switch template where if the the column header is Avatar then we want an img for that entry to receive our image url

__FILE__ app.component.ts

* in 'add image urls' paste this code
```ts
                Avatar:["angular","capybara","ga","ruby","xml"]
                .map((x:any,i)=>{
                    return "assets/media/"+x+".png"
                })[Math.floor(Math.random()*5)],
```

### The image is too small

* we may not be able to see the details of  the image so we can use event binding in angular in order for a popup to appear for with the image at a better size

* in 'photoExpander' paste this code
```ts
            this.extender.src = url
            this.extender.style.display = "flex"
```


* the outlay element was hidden and brought when needed

* if you look at the extender attribute for the class, we use the close function to "close the popup"

## Sorting 
__FILE app.component.ts__


in 'srot on the column header' observe the pSortableColumn diretive,
provide the column header of that your are trying to sort by here, whether static or by *ngFor logic

## Pagination 
* when we only show a certain amount of rows at a time its know as a paginator
to enable we apply this html to the p-table like so

* rows specify how many rows we want to show at a given times
* rowsPerPageOptions shows if we want the user to have a say in how many rows to show
* paginator enables the paginator

```html	
<p-table
...
[paginator]="true"
[rows]="10"
[rowsPerPageOptions]="[10,25,50]"
>
```

## Filter
* we can interact with the data but we dont need all the data,
however we need to make the interface avaible, the header you see does not come by default 

* in table caption refer to the html and format for as many features in your project

__FILE app.component.ts__

### FilterBy 
* say you want to control which columns a user can filter by
in 'filterBy' paste this code
```ts
            this.primengTable.filter.field = event.target.innerText
            this.searchButtons
            .forEach((x:any,i)=>{
                if(event.target.innerText === x.name){
                    x.class ="a_p_p_TableSearchSelectedButton"
                }
                else{
                    x.class = "a_p_p_TableSearchButton"
                }
            })
```

### Filter Value
* once the user types in the value, the app should store in memory
 
* in 'filterValue' paste this code
```ts
this.primengTable.filter.value = event.target.value
``` 

### FilterSubmit 
* in angular components and elements can be anything, this is backend by the ViewChildren logic, in one line of code changing your regular Element Class to a ViewContainer or a Prime Ng Table ripe with the functions you need for the table to take the data and filter out its rows


```ts
@ViewChild("pTable") table!:Table;
```

* in 'filterSubmit' paste this code
```ts
            let {field,value} = this.primengTable.filter
            // use tablefilterAll(value,'equals') to search all values
            this.table.filter(value,field,'equals')
```

* refer (here) for primeNg Table filter schema
refer to the value type in the keyword
change to camelCase removing the _
```ts
            text: [
                STARTS_WITH,
                CONTAINS,
                NOT_CONTAINS,
                ENDS_WITH,
                EQUALS,
                NOT_EQUALS
            ],
            numeric: [
                EQUALS,
                NOT_EQUALS,
                LESS_THAN,
                LESS_THAN_OR_EQUAL_TO,
                GREATER_THAN,
                GREATER_THAN_OR_EQUAL_TO
            ],
            date: [
                DATE_IS,
                DATE_IS_NOT,
                DATE_BEFORE,
                DATE_AFTER
            ]
```

