import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy, navigationType,judimaDirective } from '../customExports'
import { catchError, delay, first, take } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Directive({
    selector: '[appVanillaTilt]'
  })
  export class VanillaTiltDirective {


    @Input() vanillaTilt: any;
    extras: any;
    appExtras:any = {
        selector:"appVanillaTilt",
        name:"vanillaTilt" // the lowercase name of the directive
    }
    zChildren: any;
    subscriptions:Array<Subscription> = []
    group:any;
    ref:ChangeDetectorRef

    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer2: Renderer2,
        private ryber: RyberService
    ) { }



    ngOnInit() {
        this.extras = this[this.appExtras.name]
        let {onInit} = judimaDirective
        if (this.extras?.confirm === 'true' && this.extras?.type.includes("body")) {
            onInit({
                myThis:this,
                featureFn:(devObj)=>{
                    let {group,subscriptions,navAction} = devObj
                    let {ref,zChildren} = this
                    //  work goes here
                    Object.entries(group)
                    .forEach((x:any,i)=>{
                        let key = x[0]
                        let val = x[1]
                        // there was a navigation reinit
                        if(navAction.full ==="return"){
                            val.init = "false"
                        }
                        //


                        if(val.init !== "true" && val.types.target !== undefined){
                            val.init = "true"

                            let part:any =  Array.from(val.types.part || [])
                            let target:any = Array.from(val.types.target)

                            target
                            .forEach((y:any,j)=>{
                                zChildren[y].element.vanillaTilt?.destroy()
                                VanillaTilt.init(zChildren[y].element,{
                                    perspective:500,

                                    "mouse-event-element":[...part.map((z,k)=>{

                                        return zChildren[z].element
                                    }),zChildren[y].element],
                                    // script modification wouldn't allow me to make change otherwise
                                    ...zChildren[y].extras.appVanillaTilt?.options

                                })

                                // make sure all attached move along with element
                                let tiltOthers = (e:any)=>{
                                    part
                                    .forEach((z:any,k)=>{
                                        zChildren[z].css["will-change"] = zChildren[y].element.style["will-change"]
                                        zChildren[z].css["transform"] =   zChildren[y].element.style["transform"]

                                    })
                                    ref.detectChanges()

                                }
                                let tiltChange = fromEvent(zChildren[y].element,"tiltChange")
                                .subscribe(tiltOthers)
                                let tiltOut =  fromEvent(zChildren[y].element,"mouseout")
                                .pipe(
                                    delay(50)
                                )
                                .subscribe(tiltOthers)
                                val.subscriptions.push(...[tiltChange,tiltOut])
                                subscriptions.push(
                                    ...val.subscriptions
                                )
                                //


                            })


                        }

                    })
                    //
                }
            })
        }

    }





    ngOnDestroy() {
        let {onDestroy} = judimaDirective
        onDestroy({
            myThis:this
        })

    }

}

