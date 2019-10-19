import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fileSaver from 'file-saver';

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(private http: HttpClient) {}

  downloadFile(): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/ms-excel');

    return this.http.post(
      '/knowledge/api/v1/knowledge/bulk/output',
      {
        userName: 'admin',
        userId: 1,
        id: [551, 552, 553]
      },
      {
        // headers,
        responseType: 'blob'
      }
    ).pipe(
      map(res => {
        this.fileSaver(res, 'xxx');

        return 111;
      })
    );
  }

  downloadFile2(): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/ms-excel');

    return this.http
      .get('/configman/api/v1/importtemplate/user123', {
        headers,
        observe: 'response',
        responseType: 'blob'
      })
      .pipe(
        map(res => {
          console.log(res);

          const contentDisposition = res.headers.get('content-disposition');
          const filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
          console.log(filename);
          this.fileSaver(res.body, filename);

          return 111;
        })
      );
  }

  fileSaver(response: Blob, filename: string) {
    const blob = new Blob([response], { type: 'application/vnd.ms-excel' });

    fileSaver.saveAs(blob, filename);
  }
}
