import { Component } from '@angular/core';
import { MainServiceService } from '../../services/main-service.service';
import { FormsModule } from '@angular/forms';
import { BaseController } from '../../base.controller';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent extends BaseController<any> {
  tabIndex = 0
  roleList:any[]=[]
  registerModel:any={}
  constructor(public mainSerice:MainServiceService){
    super();
    localStorage.removeItem('token')
    localStorage.removeItem('user')
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
    this.showError("Register Successfully");
    this.tabIndex = 0
  }



  ngOnInit(){
    this.roles()
  }

}
