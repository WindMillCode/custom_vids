import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QrCodeModule } from 'ng-qrcode';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        QrCodeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
