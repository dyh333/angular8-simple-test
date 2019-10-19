import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as fileSaver from 'file-saver';
import { FileService } from './file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular File Download';

  constructor(private sanitizer: DomSanitizer, private fileService: FileService) {}

  download() {
    this.fileService.downloadFile2().subscribe(response => {
      console.log(response);

      // const blob = new Blob([response], { type: 'application/vnd.ms-excel' });

      // fileSaver.saveAs(blob, 'filename');

    });
  }
}
