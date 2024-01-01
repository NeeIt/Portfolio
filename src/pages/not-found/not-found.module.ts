import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { NotFoundRoutingModule } from "@pages/not-found/not-round-routing.module";
import { TranslateModule } from "@ngx-translate/core";
import { TranslateAnimationModule } from "@directives/translate-animation/translate-animation.module";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    NotFoundComponent
  ],
    imports: [
        CommonModule,
        NotFoundRoutingModule,
        TranslateModule,
        TranslateAnimationModule,
        MatIconModule
    ]
})
export class NotFoundModule { }
