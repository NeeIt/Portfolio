import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkCardComponent } from './work-card.component';



@NgModule({
  declarations: [
    WorkCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WorkCardComponent
  ]
})
export class WorkCardModule { }
