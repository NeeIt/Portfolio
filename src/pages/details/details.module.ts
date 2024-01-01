import { DetailsRoutingModule } from "@pages/details/details-routing.module";
import { BreadcrumbModule } from "@components/components/breadcrum/breadcrumb.module";
import { DetailsComponent } from './details.component';
import { TranslateModule } from "@ngx-translate/core";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { PhotoModule } from "@components/components/photo/photo.module";
import { TagModule } from "@components/components/tag/tag.module";
import { NgModule } from '@angular/core';
import {DateAgoPipeModule} from "@pipes/date-ago-pipe/date-ago-pipe.module";

@NgModule({
  declarations: [
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    TranslateModule,
    TagModule,
    BreadcrumbModule,
    MatIconModule,
    PhotoModule,
    DateAgoPipeModule
  ]
})
export class DetailsModule { }
