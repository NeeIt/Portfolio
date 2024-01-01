import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoSliderComponent } from './photo-slider.component';
import {MatIconModule} from "@angular/material/icon";
import {PhotoModule} from "@components/components/photo/photo.module";



@NgModule({
  declarations: [
    PhotoSliderComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    PhotoModule
  ],
  exports: [
    PhotoSliderComponent
  ]
})
export class PhotoSliderModule { }
