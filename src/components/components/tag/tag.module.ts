import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag.component';
import {TranslateModule} from "@ngx-translate/core";
import {MatTooltipModule} from "@angular/material/tooltip";



@NgModule({
  declarations: [
    TagComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatTooltipModule
  ],
  exports: [
    TagComponent
  ]
})
export class TagModule { }
