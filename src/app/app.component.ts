import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mode = false;
  dark = false;
  menus = [
    {
      level: 1,
      title: '告警管理',
      selected: false,
      expanded: false,
      children: [
        {
          level: 2,
          title: '告警历史',
          selected: false,
          expanded: false,
          link: '/my-module1'
        },
        {
          level: 2,
          title: '策略管理',
          selected: false,
          expanded: false,
          link: '/my-module2'
        }
      ]
    }
  ];

  status = 0;


  constructor(private router: Router) {}

  activedMenu(event) {
    console.log(event);
  }

  onSelectChange() {
    // this.menus[0].children[0].selected = false;
    // this.menus[0].children[1].selected = true;

    // console.log(this.menus);

    this.router.navigate(['./my-module1']);
  }
}
