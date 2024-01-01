import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileNavigationPanelComponent } from './mobile-navigation-panel.component';
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
    declarations: [
        MobileNavigationPanelComponent
    ],
    exports: [
        MobileNavigationPanelComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ]
})
export class MobileNavigationPanelModule { }
