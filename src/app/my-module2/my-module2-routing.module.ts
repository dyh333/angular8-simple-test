import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyModule2Component } from './my-module2.component';

const routes: Routes = [
  {
    path: '',
    component: MyModule2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyModule2RoutingModule {}
