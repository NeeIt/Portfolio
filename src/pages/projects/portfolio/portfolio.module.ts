import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import {PortfolioRoutingModule} from "@pages/projects/portfolio/portfolio-routing.module";
import {TranslateModule} from "@ngx-translate/core";
import {PresentationSliderModule} from "@components/components/presentation-slider/presentation-slider.module";
import {MatIconModule} from "@angular/material/icon";
import {PhotoSliderModule} from "@components/components/photo-slider/photo-slider.module";
import {BreadcrumbModule} from "@components/components/breadcrum/breadcrumb.module";
import {PhotoModule} from "@components/components/photo/photo.module";



@NgModule({
  declarations: [
    PortfolioComponent
  ],
    imports: [
        CommonModule,
        PortfolioRoutingModule,
        TranslateModule,
        PresentationSliderModule,
        MatIconModule,
        PhotoSliderModule,
        BreadcrumbModule,
        PhotoModule,
    ]
})
export class PortfolioModule { }
