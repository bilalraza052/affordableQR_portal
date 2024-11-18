import { Component, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { PageHeaderComponent } from '../../shared-component/page-header/page-header.component';
import { SetupListComponent } from '../../shared-component/setup-list/setup-list.component';
import { BaseController } from '../../base.controller';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MainServiceService } from '../../services/main-service.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-blog-category',
  standalone: true,
  imports: [PageHeaderComponent,SetupListComponent,MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,FormsModule,MatProgressSpinnerModule],
  templateUrl: './blog-category.component.html',
  styleUrl: './blog-category.component.scss'
})
export class BlogCategoryComponent extends BaseController<any> {
  columns:any[]=[
    {
      key:'title',
      label:"Category"
    }
  ]
  datasource:any[]=[]
  @ViewChild("formComponent") formComponent :TemplateRef<any> | undefined
  saveLoader: boolean = false;
  constructor(public main:MainServiceService){
    super();
  }
  openForm(element:any){
    if(this.formComponent){
        this.model = element && element.id ?element:{}
        const dialogRef = this.dialog?.open(this.formComponent,{
          width:"",
          panelClass:'dialog'
        });
        dialogRef?.afterClosed().subscribe(x=>{
          this.model = {}
        })

      }
    }
    async save(){
      this.main.isCustomControler = true
      this.main.customController = 'blogcategories'
      this.saveLoader = true
      const res= await (await this.main.save(this.model,this.model.id?`blogcategories/${this.model.id}`:null)).toPromise();
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
      this.getData()

    }
    async getData(){
      const res= await (await this.main.blogCategories()).toPromise();
      if(!res.IsSuccessful){
        return this.showError(res.Errors)
      }
      this.datasource = res.Data.data

    }
    ngOnInit(){
      this.getData()
    }
  }

