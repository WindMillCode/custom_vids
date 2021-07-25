import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren, Host,ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest, Observable } from 'rxjs';
import {  flatDeep,navigationType,eventDispatcher, numberParse, objectCopy,ryberUpdate,ryberUpdateFactory,xContain,stack, zChildren, minMaxDelta } from '../customExports'
import { catchError, delay,first, take } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debuglog } from 'util';



@Directive({
    selector: '[appLatch]'
})
export class LatchDirective {

    @Input() latch: any;
    extras: any;
    co:any;
    zChildren: any;
	dropdown:any= {
		container:null, /*zSymbol*/
		options:null
	}
	templateMyElements:any
	moveWithTarget:{sub:Subscription,index:Number}
	subscriptions:Array<Subscription> = []


    constructor(
        private ryber: RyberService,
		private ref:ChangeDetectorRef,
		private el:ElementRef
    ) { }


    ngOnInit() {
        this.extras = this.latch


        if (this.extras?.confirm === 'true') {


			let {ryber,ref,zChildren,subscriptions,extras,moveWithTarget} = this
			let rUD = ryberUpdateFactory({ryber})
            let co = this.co = this.extras.co


			// the feature has been initialized do not reinitalize on navigation
				// remember when duplicating this cant be the case
			let navAction:any = navigationType({
				type:["full"],
				fn:()=>{
					if(
						ryber.appCO0.metadata.navigation.full.navigated === "true" &&
						ryber[co].metadata.judima.init === "true"
					){
						return "return"
					}
				},
				ryber
			})



			if(extras.type ==="display" && extras.display?.type === "target"){


				let dims = [["top","height"],["left","width"]]

				subscriptions.push(
					ryber[co].metadata.zChildrenSubject
					.subscribe((devObj)=>{


						zChildren =this.zChildren= ryber[co].metadata.zChildren
						this.templateMyElements = devObj.templateMyElements

					}),


					// create the display in relation to the target object
					ryber[co].metadata.ngAfterViewInitFinished
					.pipe(first())
					.subscribe((result:any)=>{


						// co === "formCO0" ? console.log(
						// 	zChildren[extras.zSymbol].extras.appLatch,
						// 	zChildren[extras.zSymbol].extras.appDeltaNode.options?.index
						// ):null
						if(
							navAction.full === "return"
							&& zChildren[extras.zSymbol].extras.appLatch.display.init === "true"
						){
							return
						}

						// make sure duplicate target dont create duplicate latches
							// we need this because we dont delete them on ngOnDestroy anyomre
						zChildren[extras.zSymbol].extras.appLatch.display.init = "true"
						//

						// determine if there are duplicates
						let deltaNodegroup = zChildren[extras.zSymbol].extras.appDeltaNode?.group || extras.deltaNode?.group || null
						if(ryber[co].metadata.deltaNode.groups[deltaNodegroup]){
							extras.deltaNode =extras.deltaNode || {
								group:null,
								zSymbol:null,
								containerZSymbol:[]
							}
							ryber[co].metadata.latch.display.deltaNode[deltaNodegroup] ={
								count:ryber[co].metadata.deltaNode.groups[deltaNodegroup]?.deltas.length,
								symbols:objectCopy(
									ryber[co].metadata.deltaNode.groups[deltaNodegroup]?.deltas
								).reverse()[0] || []
							}
						}

						//

						// gather all elements to the part of the display
						extras.display.targets =[]
						Object.keys(zChildren)
						.forEach((x:any,i)=>{

							if(["target","part"].includes(zChildren[x].extras?.appLatch?.display?.type)){
								// consider duplicates

								let {suffix,deltaNode} = ryber[co].metadata.latch.display
								let neededZSymbol = zChildren[x].extras.appLatch?.deltaNode?.zSymbol ||zChildren[x].extras.appLatch.zSymbol


								if(zChildren[x].extras.appLatch.display.originalName === undefined){
									zChildren[x].extras.appLatch.display.originalName =
									zChildren[x].extras.appLatch.display.name
								}
								//

								if(deltaNode[deltaNodegroup]?.symbols.includes(neededZSymbol) || deltaNodegroup ===null ){
									// DONT REMOVE THIS LOGIC, FOR WHEN COMPONENT DOESNT HAVE DUPLICATES
									try{
										zChildren[x].extras.appLatch.display.name =
										zChildren[x].extras.appLatch.display.originalName+ suffix + deltaNode[deltaNodegroup].count

									}
									catch(e){}
									//
								}


								if(["target"].includes(zChildren[x].extras?.appLatch?.display.type)){

									zChildren[x].extras?.appLatch.zChildren
									.forEach((y:any,j)=>{

										if(y.originalGroup === undefined){
											y.originalGroup = y.group
										}

										// if this display is meant to be a container  for its repeated try to make one its doesnt need
											// naming conventions, else make each display unique only to its connected  duplicated

											y.group = y.group
											.map((z:any,k)=>{

												if(deltaNode[deltaNodegroup]?.symbols.includes(neededZSymbol) || deltaNodegroup ===null){
													// DONT REMOVE THIS LOGIC, FOR WHEN COMPONENT DOESNT HAVE DUPLICATES
													try{
														return  y.originalGroup[k] + suffix + deltaNode[deltaNodegroup].count
													}
													catch(e){}
													//
												}
												return z
											})

										//

									})

								}
								extras.display.targets.push(x)
							}
						})
						//

						extras.zChildren = extras.zChildren
						.filter((x:any,i)=>{
							if(x?.type?.includes("deltaNodeContainer") && x.group[0] !== x.originalGroup[0]){
								// update the targets of the deltaNodeContainer
								// console.log(extras.deltaNode.containerZSymbol,x)
								let {containerZSymbol} = extras.deltaNode
								containerZSymbol
								.forEach((y:any,j)=>{
									zChildren[y].extras.appLatch.zChildren[j].neededTargets =
									extras.display.targets
									.filter((z:any,k)=>{
										// console.log(zChildren[y].extras.appLatch.display.name)
										return zChildren[y].extras.appLatch.zChildren[j].originalGroup
										.includes(zChildren[z].extras.appLatch.display.originalName)
									})

								})

								//
								return false
							}
							return true
						})


						extras.display.targets =  extras.zChildren
						.map((x:any,i)=>{

							let css= {
								...x.css
							}
							let zChidlrenExtras = {
								...x?.extras
							}



							let neededTargets
							if(x?.type?.includes("deltaNodeContainer")){
								neededTargets = x.neededTargets= extras.display.targets
								.filter((y:any,j)=>{
									return x.originalGroup.includes(zChildren[y].extras.appLatch.display.originalName)
								})
							}
							else{
								neededTargets = x.neededTargets= extras.display.targets
								.filter((y:any,j)=>{
									return x.group.includes(zChildren[y].extras.appLatch.display.name)
								})
							}

							this._displayDetermineDims({
								dims, neededTargets, zChildren:this.zChildren, css,
								logic:x.logic[ryber[co].metadata.section.mediaQuery] ||  x.logic["default"]
							});


							try{
								Object.values(zChidlrenExtras)
								.forEach((y:any,j)=>{
									y.co = co

								})
								if(x.needed?.includes("appLatch")){
									zChidlrenExtras.appLatch = {}
								}
								zChidlrenExtras.appLatch.deltaNode ={
									...zChidlrenExtras.appLatch.deltaNode,
									group: zChildren[extras.zSymbol].extras.appDeltaNode?.group,
									zSymbol:extras.zSymbol
								}
							}
							catch(e){}


							let symbol = rUD({
								quantity:4,
								co,
								bool:x.bool,
								css,
								cssDefault:{},
								text:x.text || "",
								extras: {
									judima:{
										formatIgnore:"true",
										topLevelZChild:"true"
									},
									...zChidlrenExtras
								},
								val:x.val + "  a_p_p_Display"
							})

							if(x?.type?.includes("deltaNodeContainer")){

								extras.deltaNode.containerZSymbol.push(extras.zSymbol)
							}

							return symbol
						})



						// console.log(extras.zChildren)
						ref.detectChanges()

						// let the component know we have new elements on the DOM
						ryber[co].metadata.latch.updateZChild.next({
						})
						//


						zChildren[extras.zSymbol].extras.appDeltaNode.options?.modify({
							zChild:this.zChildren,
							x:extras.zSymbol,
							index:zChildren[extras.zSymbol].extras.appDeltaNode.options.index,
							hook:"latchDirective",
							co:ryber[co]
						})
					}),
					//

					// move with target
					ryber[co].metadata.ngAfterViewInitFinished
					.subscribe((result:any)=>{
						if(!Object.keys(zChildren).includes(extras.zSymbol)){
							return
						}


						extras.zChildren
						.forEach((x:any,i)=>{
							// for some reason on navigation this filter methods removes
								// zChildren already on the DOM so this must apply to
								// deltaNodeContainer only
							if(x?.type?.includes("deltaNodeContainer")){
								x.neededTargets =
								x.neededTargets
								.filter((y:any,j)=>{
									return zChildren[y] !== undefined
								})
							}
							//

							this._displayDetermineDims({
								zSymbol:extras.display.targets[i],
								dims,
								neededTargets:x.neededTargets,
								zChildren: this.zChildren ,
								css:zChildren[extras.display.targets[i]]?.css || {},
								logic:x.logic[ryber[co].metadata.section.mediaQuery] || x.logic["default"]
							});
						})
						ref.detectChanges()
					}),
					//

					// on scroll reposition
					fromEvent(window,"scroll")
					.subscribe((result:any)=>{
						if(!Object.keys(zChildren).includes(extras.zSymbol)){
							return
						}

						extras.zChildren
						.forEach((x:any,i)=>{


							this._displayDetermineDims({
								zSymbol:extras.display.targets[i],
								dims,
								neededTargets:x.neededTargets,
								zChildren:this.zChildren,
								css:zChildren[extras.display.targets[i]]?.css || {},
								logic:x.logic[ryber[co].metadata.section.mediaQuery] || x.logic["default"]
							});
						})
						ref.detectChanges()
					})
					//

				)



			}

        }
    }


	private _displayDetermineDims(devObj:{zSymbol?:string,dims: string[][], neededTargets: any, zChildren: any, css: any,logic:any}) {
		let {zSymbol,dims,neededTargets,zChildren,css,logic} = devObj
		zChildren = this.zChildren


		let delta:any = {
			vertical:null,
			horizontal:null,
			current:null
		}

		// determine if there nested zChildren
			/* nested zChildren cannot have display wrap around them since they dont have
			 the css props required, in relation to the target zChild they belong to the app and you can only use functions  */
		let dimsAvailble = neededTargets
		.filter((z:any,k)=>{
			return zChildren[z].extras.judima.topLevelZChild === "false"
		})
		//

		if(dimsAvailble.length === 0){
			dims
			.forEach((z: any, k) => {
				delta.current = minMaxDelta({
					type: "identify",
					items: neededTargets,
					min: (item) => {
						return {
							key: item,
							value: numberParse(zChildren[item].css[z[0]])
						};
					},
					max: (item) => {
						return {
							key: item,
							value: numberParse(zChildren[item].css[z[0]]) +
								numberParse(zChildren[item].css[z[1]])
						};
					}
				});

				css[z[0]] = delta.current.min.value;
				css[z[1]] = delta.current.max.value - delta.current.min.value;
				delta[Object.keys(delta)[k]] = delta.current
			})
		}


		Object.entries(logic)
		.forEach((y:any,i)=>{
			let key = y[0]
			let val = y[1]
			// console.log(key,val)
			if(["metadata"].includes(key)){
				return
			}
			if(typeof val ==="number" && dimsAvailble.length === 0){
				if(["width","height"].includes(key)){
					css[key] = (val * css[key]).toString() + "px"
				}
				else if(["top","left"].includes(key)){
					css[key] = (val + css[key]).toString() + "px"
				}

			}
			//dev provides a custom fn to calculate the display
				// must return a number

			else if(typeof val ==="function"){

				css[key] = val({
					zSymbol,
					css,
					delta,
					zChildren,
					metadata:logic.metadata?.[key],
					minMaxDelta
				}).toString()+"px"
			}
			//

		})

	}



    ngOnDestroy() {


        if (this.extras?.confirm === 'true') {


			let {ryber,extras,co,subscriptions} = this

				// prevent the dropdown from being destroyed on navigation
					// lets be honest subscriptions might go missing
				let action:any = navigationType({
					type:["full"],
					fn:()=>{
						if(ryber.appCO0.metadata.navigation.full.navigated === "true"){
							return "return"
						}
					},
					ryber
				})

				//


			subscriptions
			.forEach((x: any, i) => {
				x.unsubscribe()
			})
			delete this.subscriptions
			// console.log(this.extras)


			if(extras.type ==="display" && extras.display?.type === "target"){
				let {ref,zChildren,templateMyElements} = this

				let rUD = ryberUpdateFactory({ryber})

				// massive performance boost if removed , major deprecation consideration

				// templateMyElements.changes
				// .pipe(
				// 	take(1),
				// )
				// .subscribe({
				// 	next:(result:any)=>{

				// 		extras.display.targets
				// 		.forEach((x:any,i)=>{
				// 			// recursively search for displays on other displays
				// 				// if issues check here however we strong recommend against using recursed display
				// 				//  find a better ratio then adding displays on on top another
				// 			let recursedDisplays = this.getRecursedDisplays({x,zChildren})
				// 			recursedDisplays
				// 			.forEach((y:any,j)=>{
				// 				rUD({
				// 					symbol:y,
				// 					type:"remove",
				// 					co
				// 				})
				// 			})
				// 			//
				// 		})
				// 		ref.detectChanges()
				// 	},
				// })
			}

        }
    }

	private getRecursedDisplays(devObj:{x:string,zChildren: any} ) {


			let { x,zChildren } = devObj;

			if (zChildren[x].extras.appLatch?.display?.targets !== undefined) {

				return flatDeep(
					[
						x,
						zChildren[x].extras.appLatch?.display?.targets
						.map((y: any, j) => {
							return this.getRecursedDisplays({ x: y,zChildren });
						})
					],
					Infinity
				)

			}
			else if (zChildren[x].extras.appLatch?.display?.targets === undefined) {
				return [x];
			}


	}
}

