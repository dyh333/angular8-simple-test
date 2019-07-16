import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyModule1Component } from './my-module1.component';

const routes: Routes = [
  {
    path: '',
    component: MyModule1Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyModule1RoutingModule {}
