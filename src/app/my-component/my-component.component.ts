import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@cmss/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponentComponent implements OnInit {
  Editor = ClassicEditor;
  // ClassicEditor.builtinPlugins = [
  //   Alignment
  // ];

  model = {
    editorData: '<p>Hello, world!</p>'
  };

  ngOnInit(): void {

  }

  public onChange( { editor }: ChangeEvent ) {
    const data = editor.getData();

    const wordCountPlugin = editor.plugins.get('WordCount');

    console.log(wordCountPlugin.characters);
  }

}
