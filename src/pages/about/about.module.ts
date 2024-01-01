import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from "./about-routing.module";
import {TranslateModule} from "@ngx-translate/core";
import {TagModule} from "@components/components/tag/tag.module";
import { AboutPathTextComponent } from './about-path-text/about-path-text.component';
import {MatIconModule} from "@angular/material/icon";
import {BreadcrumbModule} from "@components/components/breadcrum/breadcrumb.module";



@NgModule({
  declarations: [
    AboutComponent,
    AboutPathTextComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    TranslateModule,
    TagModule,
    MatIconModule,
  ]
})
export class AboutModule { }
