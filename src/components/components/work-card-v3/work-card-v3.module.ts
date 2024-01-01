import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkCardV3Component } from './work-card-v3.component';
import {TagModule} from "@components/components/tag/tag.module";
import {TranslateModule} from "@ngx-translate/core";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {PhotoSliderModule} from "@components/components/photo-slider/photo-slider.module";
import {PhotoModule} from "@components/components/photo/photo.module";



@NgModule({
  declarations: [
    WorkCardV3Component
  ],
  imports: [
    CommonModule,
    TagModule,
    TranslateModule,
    MatIconModule,
    RouterModule,
    PhotoSliderModule,
    PhotoModule
  ],
  exports: [
    WorkCardV3Component
  ]
})
export class WorkCardV3Module { }
