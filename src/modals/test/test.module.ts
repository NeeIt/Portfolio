import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule
  ],
  exports: [
    TestComponent
  ]
})
export class TestModalModule { }
