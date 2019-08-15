import { Component } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  width: number;
  height: number;

  onResized(event: ResizedEvent) {
    this.width = event.newWidth;
    this.height = event.newHeight;

    console.log(this.width + ',' + this.height);
  }
}
