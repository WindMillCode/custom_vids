import {Directive, ElementRef, HostListener,Input,Renderer2} from '@angular/core';
import {RyberService} from '../ryber.service'
import {fromEvent,of, Subscription, Subject,from} from 'rxjs'
import {catchError, count,delay} from 'rxjs/operators'
import { eventDispatcher, flatDeep, objectCopy,sCG,minMaxDelta,isDate } from '../customExports';
import {environment}  from '../../environments/environment'




@Directive({
  selector: '[appFormControl]'
})
export class FormControlDirective {

    @Input() formControl: any;
    extras= undefined
    f:HTMLFormElement
    fSub:Subscription
    fCSub:Subscription
    fDSub:Subscription
    fFormUpdateSub:Subject<any> = new Subject<any>()
    fFormUpdateSubscription:Subscription
    fFormUpdate: Array<any> = []
    destroyCompleteSubscription: Subscription
    @HostListener('click') onClick(){
        if(this.extras?.confirm === 'true'){
            eventDispatcher({
                element:this.f,
                event:'submit'
            })
        }
    }

    constructor(
        private el:ElementRef,
        private renderer2: Renderer2,
        private ryber:RyberService
    ) { }

    ngOnInit(){

        this.extras = this.formControl
        if(this.extras?.confirm === 'true'){
            this.f = this.renderer2.createElement("form")
            this.f.id = this.extras.id

            // submission procession data gets converted here
            this.fSub=fromEvent(
                this.f,
                'submit'
            )
            .subscribe((e:any)=>{
                let files = (document.querySelector("input[type='file']") as HTMLInputElement).files
                Array.from(
                    files
                )
                .forEach((x:any,i)=>{
                    // upload to dropbox
                    console.log(x)
                    if(x.size <= 10244304){
                        let reader = new FileReader()
                        reader.onload
                        from(
                            x.arrayBuffer()
                        )
                        .pipe(
                        catchError((error)=>{
                            return of(error)
                        })
                        ).subscribe((result:any)=>{
                            console.log(result)
                            this.ryber.http.post(
                                "https://content.dropboxapi.com/2/files/upload",
                                result,
                                {
                                    headers:{
                                        Authorization: "Bearer AN-8rJ0XuEwAAAAAAAAAATUAu6uTWRtwFG8s7WOMmdIoHdYI4Ep2yYw3mOfh5MyO",
                                        "Dropbox-API-Arg": JSON.stringify({
                                            "path": "/" +x.name,
                                            "mode": "add",
                                            "autorename": true,
                                            "mute": false,
                                            "strict_conflict": false
                                        }),
                                        "Content-Type":  "application/octet-stream"
                                    }
                                }
                            )
                            .pipe(
                            catchError((error)=>{

                                (document.querySelector(".f_o_r_m_UI-Change") as any).innerText =
                                `Submission Failed Please Check your internet connection
                                `
                                return of(['fail'])
                            })
                            ).subscribe((result)=>{
                                console.log(result);
                                let answer = result as any
                                if(answer[0] === "fail"){
                                    return
                                }
                                (document.querySelector(".f_o_r_m_UI-Change") as any).innerText =
                                `Submission sucessful, you have uploaded ${result.name}
                                `
                                eventDispatcher({
                                    event:'resize',
                                    element:window
                                })
                            })
                        })
                    }
                    //
                })

                if( files.length === 0){
                    (document.querySelector(".f_o_r_m_UI-Change") as any).innerText =
                    `I did not receive any files for upload
                    `
                    eventDispatcher({
                        event:'resize',
                        element:window
                    })
                }
            })
            //

        }

    }





    ngOnDestroy(){

        if(this.extras?.confirm === "true"){

        }

    }

}


