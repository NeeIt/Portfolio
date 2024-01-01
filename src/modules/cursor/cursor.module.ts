import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursorComponent } from './cursor.component';



@NgModule({
  declarations: [
    CursorComponent
  ],
  exports: [
    CursorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CursorModule { }
