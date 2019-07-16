import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyModule2Component } from './my-module2.component';
import {MyModule2RoutingModule} from './my-module2-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MyModule2RoutingModule
  ],
  declarations: [MyModule2Component]
})
export class MyModule2Module { }
