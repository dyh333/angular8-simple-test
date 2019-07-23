import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const myRxmq = new Rxmq();

    const subscription = myRxmq.channel('posts')
      .observe('post.add')
      .subscribe(
        // following methods are same as for Rx.Observable.subscribe
        data => {
          // handle new data ...
          console.log(data);
        },
        error => {
          // handle error ...
        }
      );

      // tslint:disable-next-line: align
      Rxmq.channel('posts')
      .subject('post.add')
      .next({
        title: 'Woo-hoo, first post!',
        text: 'My lengthy post here'
      });
  }
}
