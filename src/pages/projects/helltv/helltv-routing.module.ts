import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HelltvComponent} from "@pages/projects/helltv/helltv.component";

const routes: Routes = [
  {
    path: '',
    component: HelltvComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class HelltvRoutingModule { }
