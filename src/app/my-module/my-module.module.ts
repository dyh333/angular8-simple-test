import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyModuleComponent } from './my-module.component';
import { MyModuleRoutingModule } from './my-module.routing.module';
import { PubSubModule } from '@cmss/angular-pubsub';

@NgModule({
  imports: [CommonModule, MyModuleRoutingModule, PubSubModule],
  declarations: [MyModuleComponent],
  exports: [MyModuleComponent]
})
export class MyModuleModule {}
