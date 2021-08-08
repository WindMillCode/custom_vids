import { Component } from '@angular/core';
import { of } from 'rxjs';
import { delay,tap } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'AngularApp';

    app:any = {
        download:{
            click:()=>{
                this.app.penrose.style.display = 'block';
                of({})
                .pipe(
                    delay(1000),
                    tap(()=>{
                        this.app.penrose.style.display = "none"
                    })
                )
                .subscribe();

            }
        },
        penrose:{
            style:{}
        }
    }
}
