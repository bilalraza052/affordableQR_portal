import { MainServiceService } from '../../services/main-service.service';
import { Component } from '@angular/core';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { PageHeaderComponent } from '../../shared-component/page-header/page-header.component';
import { BaseController } from '../../base.controller';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [NgxFileDropModule,PageHeaderComponent,MatProgressSpinnerModule],
  templateUrl: './upload-patients.component.html',
  styleUrl: './upload-patients.component.scss'
})
export class UploadPatientsComponent extends BaseController<any> {
  public files: string='';
  currentFile:any;
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
          this.currentFile = file


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
    if(!this.currentFile) return this.showError("Please Select any file")
    this.uploadLoading = true
    const formData = new FormData();
    formData.append('file',this.currentFile)
    const res= await (await this.main.uploadPatients(formData)).toPromise();
    this.uploadLoading = false
    if(!res.IsSuccessful) return this.showError(res.Errors?.message)
    this.showError("Upload Successfully");
    this.files = ''
    this.currentFile = ''
  }

}
