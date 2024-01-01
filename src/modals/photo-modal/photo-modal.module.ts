import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoModalComponent } from './photo-modal.component';
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    PhotoModalComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule
  ],
  exports: [
    PhotoModalComponent
  ]
})
export class PhotoModalModule { }
