import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateAnimationDirective} from "./translate-animation.directive";

@NgModule({
  declarations: [TranslateAnimationDirective],
  imports: [
    CommonModule
  ],
  exports: [
    TranslateAnimationDirective
  ]
})
export class TranslateAnimationModule { }

