import { Component } from '@angular/core';
// import * as dyh from 'dyh-ts-lib';
// import { arrayTest, arrayEqual } from 'dyh-ts-lib';
import { isArray, getDateFormat } from '@cmss/jslib';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  width: number;
  height: number;

  constructor() {
    console.log(getDateFormat('yyyy', '1999-10-19'));
  }
}
