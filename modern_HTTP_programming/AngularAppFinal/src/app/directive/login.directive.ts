import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy, navigationType,judimaDirective } from '../customExports'
import { catchError, delay, first, take } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';


@Directive({
    selector: '[appLogin]'
})
export class LoginDirective {


    @Input() login: any;
    extras: any;
    appExtras:any = {
        selector:"appLogin",
        name:"login"
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

        if (this.extras?.confirm === 'true' && this.extras?.type.includes("body")) {
            let {onInit} = judimaDirective
            onInit({
                myThis:this,
                featureFn:(devObj)=>{
                    let {group,subscriptions} = devObj
                    let {http,zChildren,ryber,appExtras} = this
                    //  work goes here
                    Object.entries(group)
                    .forEach((x:any,i)=>{
                        let key = x[0]
                        let val = x[1]

                        let username:Array<string> = Array.from(val.types['username'] || [])
                        let password:Array<string> = Array.from(val.types['password'] || [])
                        let submit = Array.from(val.types['submit'] || [])
                        let refresh = Array.from(val.types['refresh'] || [])



                        refresh
                        .forEach((y:any,j)=>{
                            if(zChildren[y].extras[appExtras.selector].loginCheck !== "true"){
                                zChildren[y].extras[appExtras.selector].loginCheck = "true"

                                // get a new access token on refreshing the page
                                let myCheck = http.post(
                                    env.login.url,
                                    {
                                        env:"refresh_page"
                                    },
                                    {
                                        withCredentials:true,
                                        headers:{
                                            "Content-Type":"text/plain"
                                        }
                                    }
                                )
                                .subscribe({
                                    next:(result:any)=>{

                                        // place the token and credentials in memory
                                        ryber.appCO0.metadata[appExtras.name].credentials = {
                                            token:result.token,
                                            user:result.user
                                        }
                                        //


                                        // change the path
                                        ryber.appCO0.metadata.navigation.full.navigated = "true"
                                        ryber.appCurrentNav = "/home"
                                        //
                                    },
                                    error:(err:any)=>{

                                    }
                                })
                                //
                                val.subscriptions.push(myCheck)

                            }
                        })


                        submit
                        .forEach((y:any,j)=>{
                            // submit the form to the backend for processing


                            let myClick = fromEvent(zChildren[y].element,"click")
                            .subscribe((result:any)=>{

                                let user = zChildren[username[0]].element.value
                                let pass = zChildren[password[0]].element.value


                                // send the user credentials to the backend
                                let request= http.post(
                                    env.login.url,
                                    JSON.stringify({
                                        env:"login",
                                        user,
                                        pass
                                    }),
                                    {
                                        withCredentials:true,
                                        headers:{
                                            "Content-Type":"text/plain"
                                        }
                                    }
                                )
                                .subscribe({
                                    next:(result:any)=>{

                                        // place the token and credentials in memory
                                        ryber.appCO0.metadata[appExtras.name].credentials = {
                                            token:result.token,
                                            user:result.user
                                        }
                                        //


                                        // change the path
                                        ryber.appCO0.metadata.navigation.full.navigated = "true"
                                        ryber.appCurrentNav = "/home"
                                        //

                                    },
                                    error:(err:HttpErrorResponse)=>{

                                    }
                                })

                                //

                                val.subscriptions.push(request)
                            })
                            val.subscriptions.push(myClick)

                            //
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

