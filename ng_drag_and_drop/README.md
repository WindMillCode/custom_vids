
# ng drag and drop

* after this lab your project shoud look like list.component.final.ts,styles.final.scss
* if issues restart lab from  list.component.start.ts,styles.start.scss

## Start the Angular app
* download the frontend [here](https://downgit.github.io/#/home?url=https://github.com/WindMillCode/custom_vids/tree/master/ng_drag_and_drop)
* open a terminal and head to project root and run this command
```ps1
cd AngularApp
npm install -s
npx ng serve 
```




## Required files
* open
AngularApp\src\app\list.component.ts
AngularApp\src\styles.scss


## Hold and move is automatically enabled
* try to hold on an element and move the mouse it automatically works
* you can drag element, you need to create code to receive the element once you drop it

## Show the component is ready to receive the drag and drop

__FILE list.component.ts__
* in  'reorder items' paste this code
    * if you know how ngFor works, every time I interfere with the data array, binding will update as necessary, however the user needs to see this to know the app is working
```ts
        if (this.draggingIndex !== index) {
            let  itemToBeReordered = this.data.splice(this.draggingIndex, 1)[0];
            this.data.splice(index, 0, itemToBeReordered);
            this.draggingIndex = index;
        }
```

__FILE styles.scss__
* in differentiate paste this code
```scss
@for $i from 1 through $repeat {
    .drag-wrapper#{$i} {
        .card{ background: nth($colors, random(length($colors)));};
        // @debug nth($colors, random(length($colors)));
    }
}
```
* in 'give the selecting effect' paste this code
```scss
.drag-wrapper.dragging {
    opacity: 0.5;
}
```

## Update the state
* always good practice to updatethe state

in 'update start state' paste this code
```ts
this.draggingIndex = index;
```

* in 'update end state' paste this code

```ts
 delete this.draggingIndex
```

## Resource 