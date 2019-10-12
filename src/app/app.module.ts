import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PubSubModule } from '@cmss/angular-pubsub';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyModuleModule } from './my-module/my-module.module';
import { YouModuleComponent } from './you-module/you-module.component';

@NgModule({
  declarations: [AppComponent, YouModuleComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PubSubModule.forRoot(),
    MyModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
