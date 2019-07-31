import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import zh from '@angular/common/locales/zh';
import { MyComponentComponent } from './my-component/my-component.component';

registerLocaleData(zh);

@NgModule({
   declarations: [
      AppComponent,
      MyComponentComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      NgZorroAntdModule,
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      CKEditorModule
   ],
   entryComponents: [MyComponentComponent],
   providers: [
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
