# Using ViewChildren  in Angular

## [Youtube Walkthrough](https://youtu.be/Tn0Tx1Rbpe4)

* after the lab your file should look like form.component.final.ts 
* if issues copy and paste from form.component.start.ts


### Start the Angular App

* download the frontend [here](https://downgit.github.io/#/home?url=https://github.com/codequickie123/custom_vids/tree/master/ViewChildren_in_Angular_and_getting_changes)
open a terminal and head to project root and run this command
```ps1
npm install -s
npx ng serve -c=play --open=true
```

* open form.component.ts in your terminal

### @ViewChildren

* @ViewChildren is an advanced way to get several elements in a components
* its like the advanced form of document.querySelectorAll
* its the plural of @ViewChild
* we use templateVariables instead of css selectors to help filter the elements we want 

```html
        <div
		#myVal
			<h1
			#myVal
			</h1>	
			<p
			#myVal
			</p>					
        </div>
```

```ts
 @ViewChildren('myVal', {read:ElementRef}) templateMyElements: any;
//  will return a QueryList 
```

* in the app, enter some text then click outside the input 
![](needed_images/zoom_0.gif)
* we see new elements are coming onto the DOM but our component does not have a way to interact with them
* for the advanced there are several different way, but most efficient is the way below

### QueryList
read more [here](https://angular.io/api/core/QueryList)
* we use QueryList.changes so that we can have realtime access to how many elements on the dom


in 'listen for element changes' paste this code
```ts
this.ryber.appEvents({
	typesES:this.typesES,
	event:'latchUpdate',
	of:this.templateMyElements.changes
	.pipe(
		delay(2)
	)
	.subscribe((change)=>{
		console.log(change)
		this.renderer2.setProperty(
			change.last.nativeElement,
			"innerText",
			`There are ${change.length} elements in this component`
		)
		this.ref.detectChanges()

		// use the changes list and update as needed
	})
})
```

* we see this.renderer2 angular recommended way to deal with elements
* we see this.ref.detectChanges(), used when modifying elements
* head to angular.io and type these concepts in the query box to learn  more
* we use pipe(delay()) because it fires to quickly, a 3rd party app might still be initializing the element, and your updates may be overriden or result in an error
* take the same action in the app as before and notice how the component, knows more elements are being added to the dom,

## Resources
[queryList](https://angular.io/api/core/QueryList)

