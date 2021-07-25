import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy, navigationType,judimaDirective } from '../customExports'
import { catchError, delay, first, take,skip,distinctUntilKeyChanged } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Directive({
    selector: '[appVisible]'
})
export class VisibleDirective {


    @Input() visible: any;
    extras: any;
    appExtras:any = {
        selector:"appVisible",
        name:"visible" // the lowercase name of the directive
    }
    zChildren: any;
    subscriptions: Array<Subscription> = []
    group: any;
    ref: ChangeDetectorRef

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
                    let {group,subscriptions} = devObj
                    let {ref,zChildren,ryber} = this
                    //  work goes here
                    Object.entries(group)
                    .forEach((x:any,i)=>{
                        let key = x[0]
                        let val = x[1]

                        //groupType === click
                            let clickTarget = Array.from(val.types['clickTarget'] || [])
                            let clickPart = Array.from(val.types['clickPart'] || [])

                            // toggle show/hide of clickParts
                            clickTarget
                            .forEach((y:any,j)=>{

                                let toggle = fromEvent(zChildren[y].element,"click")
                                .subscribe((result:any)=>{

                                    clickPart
                                    .forEach((z:any,k)=>{
                                        zChildren[z].css.display = zChildren[z].css.display === "none" ? "block" : "none"
                                    })
                                    ref.detectChanges()
                                })
                                val.subscriptions.push(toggle)
                            })
                            //

                        //

                        // groupType == section
                            let sectionDesktop = Array.from(val.types['sectionDesktop'] || [])
                            let sectionMobile =  Array.from(val.types['sectionMobile'] || [])
                            let navigateSectionDesktop = Array.from(val.types['navigateSectionDesktop'] || [])

                            // give all a display object
                            ;[...sectionMobile,...sectionDesktop,...navigateSectionDesktop]
                            .forEach((y:any,j)=>{
                                zChildren[y].extras.appVisible.display = {
                                    desktop:{},
                                    mobile:{}
                                }
                            })

                            // show on desktop
                            sectionDesktop
                            .forEach((y:any,j)=>{

                                // do something when navigation happens
                                zChildren[y].extras.appVisible.display.desktop = {
                                    on:"block",
                                    off:"none",
                                }

                                //
                                let mediaQueryEvent = ryber.appCO0.metadata.ryber.sectionDefault.app.width.mediaQuerySubject
                                .pipe(delay(10),skip(1),distinctUntilKeyChanged("media"))
                                .subscribe((result:any)=>{
                                    if(result.media === "desktop"){
                                        zChildren[y].css.display =zChildren[y].extras.appVisible.display.desktop.on
                                    }
                                    else {
                                        zChildren[y].css.display =zChildren[y].extras.appVisible.display.desktop.off
                                    }
                                    ref.detectChanges()
                                })

                                val.subscriptions.push(mediaQueryEvent)

                            })
                            //

                            // show on mobile
                            sectionMobile
                            .forEach((y:any,j)=>{

                                //
                                zChildren[y].extras.appVisible.display.mobile ={
                                    on: "block",
                                    off:"none",
                                }
                                //
                                let mediaQueryEvent = ryber.appCO0.metadata.ryber.sectionDefault.app.width.mediaQuerySubject
                                .pipe(skip(1),distinctUntilKeyChanged("media"))
                                .subscribe((result:any)=>{
                                    if(result.media === "mobile"){
                                        zChildren[y].css.display =zChildren[y].extras.appVisible.display.mobile.on
                                    }
                                    else {
                                        zChildren[y].css.display =zChildren[y].extras.appVisible.display.mobile.off
                                    }
                                    ref.detectChanges()
                                })
                                val.subscriptions.push(mediaQueryEvent)

                            })
                            //

                            // show only on navigation
                            navigateSectionDesktop
                            .forEach((y:any,j)=>{

                                // do something when navigation happens

                                zChildren[y].extras.appVisible.display.desktop = {
                                    on:zChildren[y].css.display || "block",
                                    off:"none",
                                    onSet:"false",
                                    offSet:"false"
                                }

                                //
                                let mediaQueryEvent = ryber.appCO0.metadata.ryber.sectionDefault.app.width.mediaQuerySubject
                                .pipe(delay(10),skip(1),distinctUntilKeyChanged("media"))
                                .subscribe((result:any)=>{
                                    if(result.media === "desktop"){


                                        zChildren[y].css.display =zChildren[y].extras.appVisible.display.desktop.on || "block"
                                        zChildren[y].extras.appVisible.display.desktop.onSet = "true"
                                        if(
                                            zChildren["&#8353"].extras.appNavigation.name ===
                                            zChildren[y].extras.appVisible.options.url
                                        ){
                                            zChildren[y].css.display = "block"
                                        }
                                        else if(
                                            zChildren["&#8353"].extras.appNavigation.name !==
                                            zChildren[y].extras.appVisible.options.url
                                        ){
                                            zChildren[y].css.display = "none"
                                        }

                                    }
                                    else{


                                        if(zChildren[y].extras.appVisible.display.desktop.onSet === "true"){
                                            zChildren[y].extras.appVisible.display.desktop.on = zChildren[y].css.display
                                            zChildren[y].css.display = zChildren[y].extras.appVisible.display.desktop.off
                                        }
                                        else {
                                            zChildren[y].css.display = zChildren[y].extras.appVisible.display.desktop.off
                                        }
                                        // zChildren[y].css.display =
                                        // zChildren[y].extras.appVisible.display.desktop.offSet === "true" ?
                                        // zChildren[y].extras.appVisible.display.desktop.off : "none"

                                        zChildren[y].extras.appVisible.display.desktop.offSet = "true"
                                    }
                                    ref.detectChanges()
                                })

                                val.subscriptions.push(mediaQueryEvent)

                            })
                            //

                        //


                        subscriptions.push(...val.subscriptions)

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

