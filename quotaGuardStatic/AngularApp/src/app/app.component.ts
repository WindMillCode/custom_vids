import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        private http:HttpClient
    ){}


        // some example code

    title = 'Simple QuotaGuardStatic';

    button = {
        result:"",
        connect : (e)=>{
            this.http.post(
                //  replace your url here
                'https://quotaguard-2313.herokuapp.com/',
                //
                {
                    env:"connect"
                },
                {
                    responseType:"text"
                }
            )
            .subscribe({
                next:(result:any)=>{
                    this.button.result = "Connected"
                },
                error:(err:any)=>{
                    console.log(err)
                    this.button.result = "CORS Error backend IP not whitelisted "
                }
            })
        }
    }
}
