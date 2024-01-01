import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KfcComponent } from './kfc.component';
import {KfcRoutingModule} from "@pages/projects/kfc/kfc-routing.module";
import {TranslateModule} from "@ngx-translate/core";
import {PhotoSliderModule} from "@components/components/photo-slider/photo-slider.module";
import {MatIconModule} from "@angular/material/icon";
import {BreadcrumbModule} from "@components/components/breadcrum/breadcrumb.module";



@NgModule({
  declarations: [
    KfcComponent
  ],
    imports: [
        CommonModule,
        KfcRoutingModule,
        TranslateModule,
        PhotoSliderModule,
        MatIconModule,
        BreadcrumbModule
    ]
})
export class KfcModule { }
