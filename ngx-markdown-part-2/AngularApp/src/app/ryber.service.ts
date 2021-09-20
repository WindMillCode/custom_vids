import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { delay,tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RyberService {

    constructor(
        public router: Router,
        public http: HttpClient
    ) { }

    nav:any={
        inital:false,
        initOnMobile:false,
        items:[
            "HOME",
            "ABOUT",
            "BLOG",
            "EVENTS",
            "LABS",
            "SHOP",
        ],
        showMenu:{
            click:(evt)=>{
                let {changeDisplay} =this.nav.mobileMenu.view
                changeDisplay()

            }
        },
        showFn:(devObj)=>{
        let {vcf,ref} = devObj
            vcf.element.nativeElement.style.opacity = 1;
            this.nav.inital = true
            ref.detectChanges();
        }
    }

    labs :any ={
        panel:{
            show:false,
            view:{
                style:{
                    width:"0px"
                },
            },
            url:{
                style:{},
                type:"iframe"
            },
            thumbnail:{
                style:{}
            },
            title:{
                style:{}
            },
            lab:{
                style:{},
                type:"iframe"
            },
            close:{
                click:(evt:Event)=>{
                    let {labs}=this;
                    labs.panel.view.style.opacity = 0
                    labs.panel.view.style.height = '0px';
                    labs.panel.view.style.width = '0px';
                    delete labs.panel.view.style.transition;

                    // let the animation occur then close the panel
                    of({})
                    .pipe(
                        delay(2000),
                        tap(()=>{
                            labs.panel.show = false
                        })
                    )
                    .subscribe()
                    //
                }
            }
        },
    }
}
