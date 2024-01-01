import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkListComponent } from "./work-list.component";

const routes: Routes = [
  {
    path: '',
    component: WorkListComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class WorListRoutingModule { }
