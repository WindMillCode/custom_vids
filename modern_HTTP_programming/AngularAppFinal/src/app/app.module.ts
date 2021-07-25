import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ErrorHandler } from '@angular/core';
import {MyErrorHandler} from './errorHandler'
import { HttpClientModule   }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HammerModule} from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import {environment as env } from '../environments/environment'

import { AgGridModule } from 'ag-grid-angular';
import { NestDirective } from './directive/nest.directive';
import { LatchDirective } from './directive/latch.directive';

import { DateClickDirective } from './directive/date-click.directive';


import { ExtendDirective } from './directive/extend.directive';

import { DeltaNodeDirective } from './directive/delta-node.directive';
import { GsapCursorDirective } from './directive/gsap-cursor.directive';
import { SectionDirective } from './directive/section.directive';
import { NavigationDirective } from './directive/navigation.directive';
import { VanillaTiltDirective } from './directive/vanilla-tilt.directive';
import { VisibleDirective } from './directive/visible.directive';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import { ComponentsComponent } from './components/components.component';
import { ComponentsDirective } from './directive/components.directive';

import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { LoginDirective } from './directive/login.directive';

let providers = []
if(env.testingAcct.confirm === "true"){

	providers = [{provide: ErrorHandler, useClass: MyErrorHandler}]
}

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    NestDirective,
    LatchDirective,
    DateClickDirective,
    ExtendDirective,
    DeltaNodeDirective,
    GsapCursorDirective,
    SectionDirective,
    NavigationDirective,
    VanillaTiltDirective,
    VisibleDirective,
    ComponentsComponent,
    ComponentsDirective,
    LoginDirective,

  ],
  imports: [

    HammerModule,
    BrowserModule,
    // AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([FormComponent]),
    ButtonModule,
    CarouselModule,
    CardModule,
    DropdownModule,
    ProgressSpinnerModule
  ],
  providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
