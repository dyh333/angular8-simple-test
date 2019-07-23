import { Component, ViewChild } from '@angular/core';
// import {jsonTree} from 'json-tree-viewer';
declare var jsonTree: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('wrapper', {static: false}) wrapper;

  constructor() {}

  ngAfterViewInit(): void {
    // Get DOM-element for inserting json-tree
    // const wrapper = document.getElementById('wrapper');

    console.log(this.wrapper.nativeElement);

    const dataStr =
      '{ "firstName": "Jonh", "lastName": "Smith", "phones": ["123-45-67", "987-65-43"]}';
    const data = JSON.parse(dataStr);

    // Create json-tree
    const tree = jsonTree.create(data, this.wrapper.nativeElement);

    // Expand all (or selected) child nodes of root (optional)
    tree.expand(node => {
      return node.childNodes.length < 2 || node.label === 'phoneNumbers';
    });
  }
}
