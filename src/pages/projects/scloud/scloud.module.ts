import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScloudComponent } from './scloud.component';
import {ScloudRoutingModule} from "@pages/projects/scloud/scloud-routing.module";
import {TranslateModule} from "@ngx-translate/core";
import {PresentationSliderModule} from "@components/components/presentation-slider/presentation-slider.module";
import {MatIconModule} from "@angular/material/icon";
import {PhotoSliderModule} from "@components/components/photo-slider/photo-slider.module";
import {BreadcrumbModule} from "@components/components/breadcrum/breadcrumb.module";



@NgModule({
  declarations: [
    ScloudComponent
  ],
    imports: [
        CommonModule,
        ScloudRoutingModule,
        TranslateModule,
        PresentationSliderModule,
        MatIconModule,
        PhotoSliderModule,
        BreadcrumbModule
    ]
})
export class ScloudModule { }
