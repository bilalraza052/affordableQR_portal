import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MainServiceService } from '../../services/main-service.service';
import { FormsModule } from '@angular/forms';
import { BaseController } from '../../base.controller';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule,MatDialogActions,MatDialogClose,MatDialogContent,MatDialogTitle,MatProgressSpinnerModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent extends BaseController<any> {
  tabIndex = 0
  roleList:any[]=[]
  registerModel:any={}
  @ViewChild('changePasswordDialog') changePasswordDialog:TemplateRef<any> | undefined
  loader: boolean  = false;

  constructor(public mainSerice:MainServiceService){
    super();
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
  async forgetPassword(){
     this.mainSerice.isCustomControler = true
    this.mainSerice.customController = 'forgot-password'
    const res= await (await this.mainSerice.Post('',{
      email:this.model.email
    })).toPromise();
    this.mainSerice.customController = ''
    this.mainSerice.isCustomControler = false
    if(!res.IsSuccessful){
      return this.showError(res.Errors)
    }
    this.showError(res.Data.message)
    if(this.changePasswordDialog){
      this.dialog?.open(this.changePasswordDialog)

    }



  }
  async updatePassword(){
    this.mainSerice.isCustomControler = true
    this.mainSerice.customController = 'reset-password'
    this.loader = true
    const res= await (await this.mainSerice.Post('',this.model)).toPromise();
    this.loader = false
    this.mainSerice.customController = ''
    this.mainSerice.isCustomControler = false
    if(!res.IsSuccessful) return this.showError(res.Errors);
    this.showError("Update Successfully");
    this.dialog?.closeAll()
  }
  async login(){

    const res= await (await this.mainSerice.login(this.model)).toPromise();
    if(!res.IsSuccessful){
      return this.showError(res.Errors)
    }
    this.showError("Login Successfully");
    localStorage.setItem('token',res.Data?.data?.access_token)
    localStorage.setItem('user',JSON.stringify(res.Data?.data?.user))
    this.route?.navigate(['group'])
  }

  async roles(){
    const res= await (await this.mainSerice.roles()).toPromise();
    if(!res.IsSuccessful){
      return this.showError(res.Errors)
    }
    this.roleList = res.Data

  }

  async signUp(){
    // this.registerModel.roleId = 2
    const res= await (await this.mainSerice.register(this.registerModel)).toPromise();
    if(!res.IsSuccessful){
      return this.showError(res.Errors)
    }
    this.showError(res.Data.message);
    this.tabIndex = 0
  }



  ngOnInit(){
    this.roles()
  }

}
