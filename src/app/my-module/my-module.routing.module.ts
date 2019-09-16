import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyModuleComponent } from './my-module.component';

const routes: Routes = [
  {
    path: '',
    component: MyModuleComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyModuleRoutingModule {}
