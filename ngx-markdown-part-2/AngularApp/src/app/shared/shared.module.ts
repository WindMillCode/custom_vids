import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MediaPrefixPipe } from '../media-prefix.pipe';
import { FooterComponent } from './footer/footer.component';
import { SanitizedComponent } from './sanitized/sanitized.component';
import { SanitizeUrlPipe } from '../sanitize-url.pipe';


@NgModule({
  declarations: [
    MediaPrefixPipe,
    FooterComponent,
    SanitizedComponent,
    SanitizeUrlPipe,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    MediaPrefixPipe,
    FooterComponent,
    SanitizedComponent,
    SanitizeUrlPipe,
  ]
})
export class SharedModule { }
