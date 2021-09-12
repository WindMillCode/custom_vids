import { Component,ViewContainerRef } from '@angular/core';
import { RyberService } from './ryber.service';
import { environment as env } from 'src/environments/environment';
import {Route} from '@angular/router';
import { eventDispatcher,numberParse } from './customExports';
import { of,Subscription,fromEvent } from 'rxjs';
import { delay,tap } from 'rxjs/operators';

declare global{
    var Prism:any
}
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    // metadata
    title = 'WindMillCode';
    subs: Subscription[] = [];
    //

    constructor(
        public ryber: RyberService,
        private vcf: ViewContainerRef
    ){}

    markdown = {
        data:`
        # Structure

        ## Linting Rules
        * for each commit, we append "WORKING COMMIT" so we know the commit is free of bugs
        * ruby indentation 2 lines
        * ts indentation 4 lines


        ## Project Directory Mapping

        ### Frotend
        #### Configurations
        * we use __JudimaApp/src/envrionments__ - for dev and prod frontend configurations we includes configuations for features in the app
        `
    }
    ngOnInit() {
        let {ryber,subs} =this;

        //remove version
        if(env.production){
            this.vcf.element.nativeElement.removeAttribute("ng-version");
        }
        //

        // so we dont have to navigate on dev
        if(!env.production){
            ryber.router.navigateByUrl(env.startURL);
        }
        //

    }

    ngAfterViewInit() {
        // dev addtions

        // e2e automation tests you wnat to remove these


        //
    }

    ngOnDestroy(): void {
        this.subs
        .forEach((x:any,i)=>{
            x?.unsubscribe();
        })
    }
}

