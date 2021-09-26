import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding, HostListener, ViewContainerRef } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { RyberService } from 'src/app/ryber.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

    //metadata
    @HostBinding('class') myClass: string = "a_p_p_SpecifcView";
    subs: Subscription[] = [];
    //

    constructor(
        private ref: ChangeDetectorRef,
        private vcf:ViewContainerRef,
        private ryber: RyberService
    ) { }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.subs
        .forEach((x:any,i)=>{
            x.unsubscribe();
        })
    }

}
