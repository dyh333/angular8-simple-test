import { Component } from '@angular/core';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd';
import {MyComponentComponent} from './my-component/my-component.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  listOfData: any[] = [];

  constructor(private drawerService: NzDrawerService) {}


  ngOnInit(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Template',
      nzContent: MyComponentComponent,
    });
  }

  openComponent() {
    const drawerRef = this.drawerService.create({
        nzTitle: 'Template',
        nzContent: MyComponentComponent,
      });
  }
}
