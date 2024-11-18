import { Component, TemplateRef, ViewChild } from '@angular/core';
import { PageHeaderComponent } from '../../shared-component/page-header/page-header.component';
import { SetupListComponent } from '../../shared-component/setup-list/setup-list.component';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MainServiceService } from '../../services/main-service.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { BaseController } from '../../base.controller';
import { Editor, NgxEditorModule, toHTML, Toolbar } from 'ngx-editor';


@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [PageHeaderComponent,SetupListComponent,MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,FormsModule,MatProgressSpinnerModule,NgxEditorModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent extends BaseController<any> {
  columns:any[]=[
    {
      key:'title',
      label:'Blog Title'
    }
  ]
  datasource:any[]=[]

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  editor: Editor = new Editor();
  html = '';

  ngOnInit(): void {
    this.getData()
    this.getCategory()

    this.editor = new Editor();
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
  @ViewChild("formComponent") formComponent :TemplateRef<any> | undefined
  saveLoader: boolean = false;
  categoryList:any[]=[]
  imageTitle?:string;
  constructor(public main:MainServiceService){
    super();
  }
  openForm(element:any){
    if(this.formComponent){
        this.model = element && element.id ?element:{}
        this.html = this.model.description
        this.imageTitle = this.model.image
        const dialogRef = this.dialog?.open(this.formComponent,{
          width:"",
          panelClass:'dialog'
        });
        dialogRef?.afterClosed().subscribe(x=>{
          this.model = {}
        })

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
    onChange(val:any){
      if(!val){
        this.model.description = ''
      }
      if(typeof val != 'string'){
        this.model.description = toHTML(val)
      }else{
        this.model.description = val
      }
    }
    async onFileChange(event:any){
      if(event && event.target.files){
        this.model.image = await this.convertFileToBase64(event.target.files[0])

      }

    }
    async save(){
      this.main.isCustomControler = true
      this.main.customController = 'blog'
      this.saveLoader = true
      // this.model.image = typeof this.model.image != 'string' ? await this.convertFileToBase64(this.model.image): null
      // this.model.description= toHTML(this.model.desc)
      const res= await (await this.main.save(this.model,this.model.id?`blog/${this.model.id}`:null)).toPromise();
      this.main.customController = ''
      this.main.isCustomControler = false

      this.saveLoader = false
      if(!res.IsSuccessful) return this.showError(res.Errors);
      this.showError("saved Successfully");
      this.dialog?.closeAll()
      this.getData()

    }
    async deleteRecord(row:any){
      this.main.isCustomControler = true
      this.main.customController = 'blogcategories'
      this.saveLoader = true
      const res= await (await this.main.Delete(row.id)).toPromise();
      this.main.customController = ''
      this.main.isCustomControler = false

      this.saveLoader = false
      if(!res.IsSuccessful) return this.showError(res.Errors);
      this.showError("Delete Successfully");
      this.dialog?.closeAll()

    }
    async getCategory(){
      const res= await (await this.main.blogCategories()).toPromise();
      if(!res.IsSuccessful){
        return this.showError(res.Errors)
      }
      this.categoryList = res.Data.data

    }

    async getData(){
      const res= await (await this.main.blogs()).toPromise();
      if(!res.IsSuccessful){
        return this.showError(res.Errors)
      }
      this.datasource = res.Data.data

    }

}
