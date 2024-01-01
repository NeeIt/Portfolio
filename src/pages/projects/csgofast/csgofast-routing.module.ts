import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CsgofastComponent} from "@pages/projects/csgofast/csgofast.component";

const routes: Routes = [
  {
    path: '',
    component: CsgofastComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CsgofastRoutingModule { }
