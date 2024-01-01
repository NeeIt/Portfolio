import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './breadcrumb.component';
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    BreadCrumbComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    BreadCrumbComponent
  ]
})
export class BreadcrumbModule { }
