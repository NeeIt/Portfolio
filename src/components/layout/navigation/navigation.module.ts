import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationComponent} from "@components/layout/navigation/navigation.component";
import {
  NavigationTextPathComponent
} from "@components/layout/navigation/navigation-text-path/navigation-text-path.component";
import {TranslateModule} from "@ngx-translate/core";
import {LightModeButtonModule} from "@components/components/light-mode-button/light-mode-button.module";
import {RouterModule} from "@angular/router";
import {TranslateAnimationModule} from "@directives/translate-animation/translate-animation.module";



@NgModule({
  declarations: [
    NavigationComponent,
    NavigationTextPathComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    LightModeButtonModule,
    RouterModule,
    TranslateAnimationModule
  ],
  exports: [
    NavigationComponent,
    NavigationTextPathComponent,
  ]
})
export class NavigationModule { }
