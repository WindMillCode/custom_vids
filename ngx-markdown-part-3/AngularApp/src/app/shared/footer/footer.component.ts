import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding, HostListener, ViewContainerRef } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { mediaPrefix } from 'src/app/customExports';
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

    // metadata
    @HostBinding('class') myClass: string = "a_p_p_FooterView";
    @HostListener('animationend', ['$event']) myAnimationEnd(event: any): void {
        let { vcf } = this;
        console.log("fire")
        vcf.element.nativeElement.style.opacity = 1;
        this.ref.detectChanges();
    }
    subs: Subscription[] = [];
    //

    constructor(
        private ref: ChangeDetectorRef,
        private vcf: ViewContainerRef
    ) { }

    links = {
        items:[
            "HOME",
            "ABOUT",
            "BLOG",
            "NEWS",
            "LABS",
            "SHOP",
        ]
        .map((x:any,i)=>{
            return {
                text:x,
            }
        })
    }

    icons = {
        items:Array(12).fill(null)
        .map((x:any,i)=>{
            let media = "footer_" +i + ".png";
            let href= [
                "https://theblacktube.com/@WindMillCode",
                "https://www.facebook.com/Windmillcode-100338862024871/",
                "https://twitter.com/windmillcode",
                "https://www.instagram.com/WindMillCode/",
                "https://patreon.com/WindMillCode",
                "https://www.tiktok.com/@windmillcode?lang=en",
                "https://discord.com/channels/801450776090247168/",
                "https://app.slack.com/workspace-signin?redir=%2Fgantry%2Fauth%3Fapp%3Dclient%26lc%3D1628494381%26return_to%3D%252Fclient%252FT01KAH3L82E%252FC01K3PRF5K8%26teams%3DT02ASQWG396%252CT02AMB34T1P%252CT0B0LG60J",
                "https://www.pinterest.com/Windmillcode/_saved/",
                "https://windmillcode.tumblr.com/",
                "https://www.reddit.com/user/windmillcode",
                "https://www.twitch.tv/windmillcode"

            ][i]
            return {
                url:mediaPrefix({media}),
                click:(evt)=>{
                    window.location.href = href
                }
            }
        })
    }
    ngOnInit(): void {
    }

}
