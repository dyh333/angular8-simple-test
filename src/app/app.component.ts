import { Component } from '@angular/core';
import Rxmq from 'rxmq';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const subscription = Rxmq.channel('posts')
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

    Rxmq.channel('posts')
      .subject('post.add')
      .next({
        title: 'Woo-hoo, first post!',
        text: 'My lengthy post here'
      });
  }
}
