import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkCardV2Component } from './work-card-v2.component';
import {TagModule} from "@components/components/tag/tag.module";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    WorkCardV2Component
  ],
    imports: [
        CommonModule,
        TagModule,
        TranslateModule
    ],
  exports: [
    WorkCardV2Component
  ]
})
export class WorkCardV2Module { }
