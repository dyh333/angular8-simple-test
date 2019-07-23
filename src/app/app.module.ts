import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonTreeViewerComponent } from './json-tree-viewer/json-tree-viewer.component';


@NgModule({
   declarations: [
      AppComponent,
      JsonTreeViewerComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
