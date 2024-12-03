import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import { BaseController } from '../../base.controller';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';

import { FormsModule } from '@angular/forms';
import { MainServiceService } from '../../services/main-service.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [MatTooltipModule,MatMenuModule,FormsModule,MatDialogActions,MatDialogClose,MatDialogContent,MatDialogTitle,MatProgressSpinnerModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent extends BaseController<any> {
  @Input('pageTitle') title:string= ''
  @Input('isRefresh') isRefresh:boolean= true;
  @ViewChild('changePasswordDialog') changePasswordDialog:TemplateRef<any> | undefined
  usersInfo: any;
  loader: boolean = false;

  constructor(public mainSerice:MainServiceService){
    super();
    const info = localStorage.getItem('user');
    if(info){
      this.usersInfo = JSON.parse(info)
    }
  }

  async updatePassword(){
    this.mainSerice.isCustomControler = true
    this.mainSerice.customController = 'change-password'
    this.loader = true
    const res= await (await this.mainSerice.Post('',this.model)).toPromise();
    this.loader = false
    this.mainSerice.customController = ''
    this.mainSerice.isCustomControler = false
    if(!res.IsSuccessful) return this.showError(res.Errors);
    this.showError("Update Successfully");
    this.dialog?.closeAll()
  }

  changePassword(){
    if(this.changePasswordDialog){
      this.dialog?.open(this.changePasswordDialog)

    }
  }

}
