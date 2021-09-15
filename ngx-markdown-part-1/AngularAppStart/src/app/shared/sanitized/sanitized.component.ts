import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef,Input,HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
    selector: 'app-sanitized',
    templateUrl: './sanitized.component.html',
    styleUrls: ['./sanitized.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SanitizedComponent implements OnInit {


    @HostBinding("class") myClass:any = "a_p_p_SanitizedView"
    @Input('devObj') devObj:any;
    constructor(
        private ref:ChangeDetectorRef,
        private sanitizer:DomSanitizer
    ) { }

    sanitizePipeObj:any = {}
    ngOnInit(): void {
        let { devObj,sanitizePipeObj,ref } = this;
        
        switch (true) {
            case ["iframe","video"].includes(devObj.type):
                if(devObj.text?.match("https://www.youtube.com/watch")){
                    devObj.text = devObj.text.split("watch?v=").join("embed/");

                }
                sanitizePipeObj.value = devObj.text
                sanitizePipeObj.type = "ResourceUrl"
                break;

            default:
                break;
        }
    }

}
