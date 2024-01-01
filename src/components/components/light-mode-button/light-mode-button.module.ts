import { NgModule } from '@angular/core';
import { LightModeButtonComponent } from "./light-mode-button.component";
import { CommonModule } from "@angular/common";
import { ModalsComponent } from "@components/layout/modals/modals.component";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    declarations: [
        LightModeButtonComponent,
        ModalsComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [
        LightModeButtonComponent,
        ModalsComponent
    ]
})
export class LightModeButtonModule { }
