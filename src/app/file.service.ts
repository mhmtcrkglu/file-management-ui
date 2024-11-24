import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Root } from './file.model';
import { ShareFile } from './share-file.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Root> {
    return this.http.get<Root>(`${this.baseUrl}/Document/list`);
  }

  uploadFiles(files: File[]) {
    const formData: FormData = new FormData();

    files.forEach(file => {
      formData.append('files', file, file.name);
    });

    const headers = new HttpHeaders();

    return this.http.post(`${this.baseUrl}/Document/upload`, formData, { headers });
  }

  downloadFile(fileId: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Accept': 'application/octet-stream',
    });

    let params = new HttpParams();
    params = params.set('token', '');

    return this.http.get(`${this.baseUrl}/Document/download/${fileId}`, {
      headers,
      params,
      responseType: 'blob',
    });
  }

  generateShareLink(fileName: string): Observable<ShareFile> {
    return this.http.get<ShareFile>(`${this.baseUrl}/Document/share/${fileName}`);
  }
}
