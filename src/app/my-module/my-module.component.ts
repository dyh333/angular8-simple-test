import { Component, OnInit } from '@angular/core';
import { PubSubService } from '@cmss/angular-pubsub';

@Component({
  selector: 'app-my-module',
  templateUrl: './my-module.component.html',
  styleUrls: ['./my-module.component.css']
})
export class MyModuleComponent implements OnInit {
  constructor(private pubSubService: PubSubService) {
    this.pubSubService.$pub('pleaseCloseSidenav', 'helloIAmOverlay');
  }

  ngOnInit() {
    this.pubSubService.$sub('pleaseCloseSidenav').subscribe(from => {
      console.log(from);
    });
  }
}
