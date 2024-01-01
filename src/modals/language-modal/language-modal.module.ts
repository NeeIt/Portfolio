import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModalComponent } from "./language-modal.component";
import {TranslateModule} from "@ngx-translate/core";
import {TranslateAnimationModule} from "@directives/translate-animation/translate-animation.module";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [LanguageModalComponent],
    imports: [
        CommonModule,
        TranslateModule,
        TranslateAnimationModule,
        MatIconModule,
        ReactiveFormsModule,
    ],
  exports: [LanguageModalComponent]
})
export class LanguageModalModule { }
