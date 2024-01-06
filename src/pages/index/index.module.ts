import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { IndexRoutingModule } from "./index-routing.module";
import { TranslateAnimationModule } from "@directives/translate-animation/translate-animation.module";
import { TranslateModule } from "@ngx-translate/core";
import { IndexPathTextComponent } from './index-path-text/index-path-text.component';



@NgModule({
  declarations: [
    IndexComponent,
    IndexPathTextComponent,
  ],
    imports: [
        CommonModule,
        IndexRoutingModule,
        TranslateAnimationModule,
        TranslateModule
    ]
})
export class IndexModule { }
