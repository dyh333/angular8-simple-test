import { Component } from '@angular/core';
import { string2 } from 'dyh-ts-lib';
// import * as dyh from 'dyh-ts-lib';
// import { arrayTest, arrayEqual } from 'dyh-ts-lib';
import { arrayTest, arrayEqual } from '@cmss/jslib';

function uniqueArray<T>(array: Array<T>, uniqueField: keyof T): Array<T> {
  const hash: { [key: string]: boolean } = {};

  return array.reduce((items: Array<T>, next: T) => {
    if (!hash[(next[uniqueField] as unknown) as string]) {
      hash[(next[uniqueField] as unknown) as string] = true;

      items = [...items, next];
    }
    return items;
  }, []);
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  width: number;
  height: number;

  constructor() {
    const a = [{id: 1, value: 1}, {id: 2, value: 2}, {id: 1, value: 3}];
    console.log(uniqueArray(a, 'id'));
  }
}
