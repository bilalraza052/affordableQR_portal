import { MainServiceService } from './../../services/main-service.service';
import { Component } from '@angular/core';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { PageHeaderComponent } from '../../shared-component/page-header/page-header.component';
import { BaseController } from '../../base.controller';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [NgxFileDropModule,PageHeaderComponent,MatProgressSpinnerModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent extends BaseController<any> {
  public files: string='';
  currentFile: string = '';
  uploadLoading:boolean = false

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files.map(x=>x.relativePath).join(',');
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file(async (file: File) => {

          // Here you can access the real file
          // console.log(droppedFile.relativePath, file);
          this.currentFile = await this.convertFileToBase64(file)


          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        this.currentFile = ''
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  public fileOver(event:Event){
    console.log(event);
  }

  public fileLeave(event:Event){
    console.log(event);
  }
  constructor(public main:MainServiceService){
    super();
  }
  async uploadFile(){
    const filetype = this.files?.split('.');
    if(!filetype || (filetype && filetype.length == 0)) return
    this.uploadLoading = true
    const res= await (await this.main.uploadFile(filetype[0],this.currentFile)).toPromise();
    this.uploadLoading = false
    if(!res.IsSuccessful) return this.showError(res.Errors?.message)
    this.showError("Upload Successfully");
    this.files = ''
    this.currentFile = ''
  }

}
