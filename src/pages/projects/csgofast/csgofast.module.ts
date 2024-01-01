import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsgofastComponent } from './csgofast.component';
import {CsgofastRoutingModule} from "@pages/projects/csgofast/csgofast-routing.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {TranslateModule} from "@ngx-translate/core";
import {MatIconModule} from "@angular/material/icon";
import {PresentationSliderModule} from "@components/components/presentation-slider/presentation-slider.module";
import {PhotoSliderModule} from "@components/components/photo-slider/photo-slider.module";
import {BreadcrumbModule} from "@components/components/breadcrum/breadcrumb.module";



@NgModule({
  declarations: [
    CsgofastComponent
  ],
    imports: [
        CommonModule,
        CsgofastRoutingModule,
        MatExpansionModule,
        TranslateModule,
        MatIconModule,
        PresentationSliderModule,
        PhotoSliderModule,
        BreadcrumbModule
    ]
})
export class CsgofastModule { }
