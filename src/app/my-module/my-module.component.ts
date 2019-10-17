import { Component, OnInit } from '@angular/core';
import { PubSubService } from '@cmss/angular-pubsub';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-module',
  templateUrl: './my-module.component.html',
  styleUrls: ['./my-module.component.css']
})
export class MyModuleComponent implements OnInit {
  sub;
  $sub: Observable<any>;
  closeSidenavSub;
  obs;

  constructor(private pubSubService: PubSubService) {}

  ngOnInit() {
    // console.log(this.$sub);
    // console.log(this.$sub);

    this.obs = this.pubSubService.$sub('pleaseCloseSidenav');


    console.log(this.obs);

    this.sub = this.obs.subscribe(from => {
      console.log(from);
    });

    // this.sub = this.pubSubService.$sub('pleaseCloseSidenav', from => {
    //   console.log(from);
    // });

    // this.$sub = this.pubSubService.$sub('pleaseCloseSidenav');
  }

  ngOnDestroy(): void {
    // console.log(this.obs.source._events);

    // this.obs.source._events = [];



    console.log(this.obs);

    this.sub.unsubscribe();
  }
}
