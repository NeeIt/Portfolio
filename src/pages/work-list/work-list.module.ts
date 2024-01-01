import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkListComponent } from './work-list.component';
import { WorListRoutingModule } from "./works-list-routing.module";
import { WorkCardModule } from "@components/components/work-card/work-card.module";
import { WorkCardV3Module } from "@components/components/work-card-v3/work-card-v3.module";
import {BreadcrumbModule} from "@components/components/breadcrum/breadcrumb.module";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    WorkListComponent
  ],
  imports: [
    CommonModule,
    WorListRoutingModule,
    WorkCardModule,
    WorkCardV3Module,
    BreadcrumbModule,
    TranslateModule
  ]
})
export class WorkListModule { }
