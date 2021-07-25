import { Component, OnInit, Input } from '@angular/core';
import { RyberService } from '../ryber.service';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {

    @Input() options:any
    constructor(
        public ryber: RyberService,
    ) { }

    ngOnInit(): void {

        let styleDefaults =  {position:"static"}
        if(this.options.style === undefined){
            this.options.style = styleDefaults
        }
        else{
            Object.assign(this.options.style,styleDefaults)
        }
    }


    profileCard ={
        defaultPic:(devObj)=>{
            let {options} = this
            try {
                options.pic.src = options?.alt || mediaPrefix({
                    media:'friends/' + ['user.png','uae.png'][Math.round(Math.random())]
                })
            }
            catch (error) {
                options.pic = {
                    src:options?.alt || mediaPrefix({
                        media:'friends/' + ['user.png','uae.png'][Math.round(Math.random())]
                    })
                }
            }
        }
    }

    dropDown = {
        onChange:(event)=>{
            let {ryber,options}= this
            let childFn = options.options
            .filter((x:any,i)=>{
                return x.name ===  event.value.name
            })[0].onChange || options.items.container.onChange

            if(childFn){
                childFn({ryber,option:event.value})
            }
        }
    }


}
