import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyModule1Component } from './my-module1.component';
import {MyModule1RoutingModule} from './my-module1-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MyModule1RoutingModule,
  ],
  declarations: [MyModule1Component]
})
export class MyModule1Module { }
