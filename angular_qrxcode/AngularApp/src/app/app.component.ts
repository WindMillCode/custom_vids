import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'AngularApp';
    email = "dummy@gmail.com"
    qrCode = "Random base64 string"
    issuer = "my-issuer"
    qrdata = `Hello World`

}
