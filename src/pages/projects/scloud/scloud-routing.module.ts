import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScloudComponent} from "@pages/projects/scloud/scloud.component";

const routes: Routes = [
  {
    path: '',
    component: ScloudComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ScloudRoutingModule { }
