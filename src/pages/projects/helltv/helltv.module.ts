import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelltvComponent } from './helltv.component';
import {HelltvRoutingModule} from "@pages/projects/helltv/helltv-routing.module";
import {TranslateModule} from "@ngx-translate/core";
import {PresentationSliderModule} from "@components/components/presentation-slider/presentation-slider.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {PhotoSliderModule} from "@components/components/photo-slider/photo-slider.module";
import {BreadcrumbModule} from "@components/components/breadcrum/breadcrumb.module";



@NgModule({
  declarations: [
    HelltvComponent
  ],
    imports: [
        CommonModule,
        HelltvRoutingModule,
        TranslateModule,
        PresentationSliderModule,
        MatExpansionModule,
        MatIconModule,
        PhotoSliderModule,
        BreadcrumbModule,
    ]
})
export class HelltvModule { }
