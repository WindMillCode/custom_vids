import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FileUploadDirective } from './directive/file-upload.directive';
import {ExtendModule} from './extend/extend.module'
import { HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';


@NgModule({
  declarations: [
    AppComponent,
    FileUploadDirective
  ],
  imports: [
    // we need this to add microsoft azure and XHR features to our app
    ExtendModule,
    HttpClientModule,
    TableModule,
    //
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
