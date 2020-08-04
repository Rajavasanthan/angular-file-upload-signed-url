import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'aliFileUpload';
  fileData: File;
  constructor(private http: HttpClient) {}

  fileProgress(fileInput: Event) {
    // this.uploadButton = true;
    const target = fileInput.target as HTMLInputElement;
    this.fileData = (target.files as FileList)[0];
    console.log(this.fileData);
  }

  upload() {
    const formData = new FormData();
    formData.append('files', this.fileData);
    this.getSignedRequest(this.fileData);
  }

  getSignedRequest(file: File) {
    let keyFolderName = file.name;
    this.http
      .get(
        `http://localhost:3001/signed-url?fileName=${file.name}&fileType=${file.type}`
      )
      .subscribe(
        (data: any) => {
          this.uploadFile(file, data.url);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  uploadFile(file: File, url: string) {
    this.http
      .put(url, file, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
