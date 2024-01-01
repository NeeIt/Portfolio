import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {KfcComponent} from "@pages/projects/kfc/kfc.component";

const routes: Routes = [
  {
    path: '',
    component: KfcComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class KfcRoutingModule { }
