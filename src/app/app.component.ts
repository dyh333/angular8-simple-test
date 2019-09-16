import { Component } from '@angular/core';
import { PubSubService } from '@cmss/angular-pubsub';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  width: number;
  height: number;

  constructor(private pubsub: PubSubService) {

  }

  ontest() {
    this.pubsub.$pub('pleaseCloseSidenav', {a: 1, b: 'ontest'});
  }
}
