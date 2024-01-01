import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorksComponent } from './works.component';
import { WorksRoutingModule } from "./works-routing.module";
import {MatIconModule} from "@angular/material/icon";
import {WorksPathTextComponent} from "@pages/works/works-path-text/works-path-text.component";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    WorksComponent,
    WorksPathTextComponent
  ],
    imports: [
        CommonModule,
        WorksRoutingModule,
        MatIconModule,
        TranslateModule,
    ]
})
export class WorksModule { }
