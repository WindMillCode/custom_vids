import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef,Injector, ViewRef,ComponentFactoryResolver, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy, navigationType,judimaDirective } from '../customExports'
import { catchError, delay, first, take } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Directive({
    selector: '[appComponents]'
})
export class ComponentsDirective {

    @Input() components: any;
    extras: any;
    appExtras:any = {
        selector:"appComponents",
        name:"components" // the lowercase name of the directive
    }
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
        this.extras = this[this.appExtras.name]
        let {onInit} = judimaDirective
        if (this.extras?.confirm === 'true' && this.extras?.type.includes("body")) {
            onInit({
                myThis:this,
                featureFn:(devObj)=>{
                    let {group,subscriptions} = devObj
                    let {zChildren,cfr,injector,renderer2,ref} = this
                    //  work goes here
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
                                let lazyLoadComponentSub = from(import('../components/components.component'))
                                .pipe(delay(zChildren[y].extras.options?.component?.lazyLoadDelay || 2000))
                                .subscribe((result:any)=>{
                                    let {ComponentsComponent} = result

                                    // configure the component
                                    let componentsFactory = cfr.resolveComponentFactory(ComponentsComponent)


                                    let answer  = (zChildren[y].viewContainerRef as ViewContainerRef).createComponent(componentsFactory,undefined,injector)
                                    let instance:any = answer.instance
                                    let el:any = answer.location
                                    instance.options = zChildren[y].extras.options // two-way binding
                                    //

                                    // place the component in the DOM
                                    renderer2.addClass(
                                        zChildren[y].element,
                                        instance.options?.component?.class || null
                                    )
                                    renderer2.appendChild(
                                        zChildren[y].element,
                                        el.nativeElement
                                    )
                                    ref.detectChanges()
                                    //
                                })
                                val.subscriptions.push(lazyLoadComponentSub)
                                //
                            }
                            //

                            //     zChildren[y].viewContainerRef.clear()

                        })
                        subscriptions.push(...val.subscriptions)
                        //

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
