import { Component } from '@angular/core';
import { from } from 'rxjs';


declare global{
    var FB:any;
}
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'AngularApp';
    login = {
        click:(event:any)=>{
            from(new Promise(FB.login))
            .subscribe({
                next:(result:any)=>{
                    // console.log(result)
                },
                error:(err:any)=>{
                    // console.log(err)
                }
            })
        }
    }

}
