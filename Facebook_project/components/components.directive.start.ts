import { ComponentFactoryResolver, Injector, Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy, navigationType } from '../customExports'
import { catchError, delay, first, take } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Directive({
    selector: '[appComponents]'
})
export class ComponentsDirective {

    @Input() components: any;
    extras: any;
    zChildren: any;
    subscriptions: Array<Subscription> = []
    group: any;
    ref: ChangeDetectorRef


    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer2: Renderer2,
        private ryber: RyberService,
        private injector: Injector,
        private cfr: ComponentFactoryResolver,
    ) { }

    ngOnInit() {
        this.extras = this.components

        if (this.extras?.confirm === 'true' && this.extras?.type.includes("body")) {
            if (env.directive?.components?.lifecycleHooks) console.log(this.extras.co + " " + this.extras.zSymbol + ' components ngOnInit fires on mount')
            let { ryber, extras, zChildren, subscriptions,renderer2,injector,cfr } = this
            let { co } = extras
            let { group, suffix } = ryber[co].metadata.components

            // detects navigation
            let action: any = navigationType({
                type: ["full"],
                fn: () => {
                    if (
                        ryber.appCO0.metadata.navigation.full.navigated === "true" &&
                        ryber[co].metadata.judima.init === "true"
                    ) {
                        return "return"
                    }
                },
                ryber
            })
            //



            let mainSubscription =
                ryber[co].metadata.zChildrenSubject
                .subscribe((result: any) => {
                    zChildren = ryber[co].metadata.zChildren
                    let ref = result.ref || this.ref


                    // feature element organization

                    // reset the group for navigation and duplication
                    // if you have subscriptions unsub here
                    // Object.entries(group)
                    // .forEach((x:any,i)=>{
                    //     let key = x[0]
                    //     let val = x[1]
                    //     val.subscriptions?.forEach((y,j)=>{
                    //         y.unsubscribe()
                    //     })
                    // })
                    group = {}
                    //



                    Object.entries(zChildren)
                    .slice(2)
                    .forEach((x: any, i) => {


                        // if an element doesnt belong it doesnt belong
                        if (x[1].extras?.appComponents === undefined) {
                            return
                        }
                        //

                        // start to organize the elements into groups
                        // for latch determine which duplicate it belongs to
                        let myGroup = x[1].extras.appComponents?.group || "default"
                        let myType: Array<string> = x[1].extras.appComponents?.type || ["default"]
                        let deltaNodeGroup = x[1].extras?.appDeltaNode?.group || x[1].extras.appLatch?.deltaNode?.group
                        // determine if there is a duplicate and which duplicate it belongs to
                        let count = 0
                        if (x[1].extras.appComponents?.duplicateIgnore !== "true") {
                            ryber[co].metadata.deltaNode.groups[deltaNodeGroup]?.deltas
                            .forEach((y: any, j) => {

                                let targetZSymbols = [x[0], x[1].extras.appLatch?.deltaNode?.zSymbol]

                                let included = y.some(ai => targetZSymbols.includes(ai));
                                // console.log(included)
                                if (included) {
                                    count = j + 1
                                }
                            })
                        }
                        //
                        myGroup = myGroup.split(suffix + count)[0] + suffix + count
                        if (group[myGroup] === undefined) {
                            group[myGroup] = {
                                deltaNode: {},
                                types: {},
                                suffix,
                                count,
                                subscriptions: []
                            }

                        }

                        // organize by type
                        myType
                        .forEach((y: any, i) => {
                            if (group[myGroup].types[y] === undefined) {
                                group[myGroup].types[y] = new Set()
                            }
                            group[myGroup].types[y].add(x[0])
                        })
                        //

                    })
                    //
                    this.zChildren = zChildren
                    this.group = group
                    this.ref = ref
                    Object.entries(group)
                    .forEach((x:any,i)=>{
                        let key = x[0]
                        let val = x[1]

                        let lazyLoad = Array.from(val.types['lazyLoad'] || [])


                        lazyLoad
                        .forEach((y:any,j)=>{


                            // lazy load the components
                                // to do know if there is a duplicate

                            if(zChildren[y].extras.appComponents.loaded !== "true" && zChildren[y].extras.options.lazyLoad === "true"){
                                zChildren[y].extras.appComponents.loaded = "true"

                                // setup the lazyLoad observable

                                // 
                            }
                            //

                            //     zChildren[y].viewContainerRef.clear()

                        })
                        subscriptions.push(...val.subscriptions)
                        //

                    })

                })
            subscriptions.push(mainSubscription)

        }
    }


    ngOnDestroy() {
        if (this.extras?.confirm === 'true') {
            if (env.directive?.components?.lifecycleHooks) console.log(this.extras.co + " " + this.extras.zSymbol + ' components ngOnDestroy fires on dismount')
            this.subscriptions
                .forEach((x: any, i) => {
                    try {
                        x.unsubscribe()
                    }
                    catch (e) { }

                })
            delete this.subscriptions
        }
    }

}
