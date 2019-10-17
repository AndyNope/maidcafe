import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  /**
   * Creates an instance of file upload service.
   * @param http 
   */
  constructor(private http: HttpClient) { }
  postfile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image',fileToUpload,fileToUpload.name);
    return this.http.post("https://maid-cafe.ch/controller.php?mode=uploadImage", formData);
  }
}
