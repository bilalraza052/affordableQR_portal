import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../shared-component/page-header/page-header.component';
import { FormsModule } from '@angular/forms';
import { MainServiceService } from '../../services/main-service.service';
import { BaseController } from '../../base.controller';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [PageHeaderComponent,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends BaseController<any> {
  roleList: any[]=[];
  constructor(private mainService:MainServiceService){
    super()
  }
  registerModel:any={}
  async roles(){
    const res= await (await this.mainService.roles()).toPromise();
    if(!res.IsSuccessful){
      return this.showError(res.Errors)
    }
    this.roleList = res.Data

  }

  async signUp(){
    const res= await (await this.mainService.register(this.registerModel)).toPromise();
    if(!res.IsSuccessful){
      return this.showError(res.Errors)
    }
    this.showError("Register Successfully");
  }

  ngOnInit(){
    this.roles()
  }
  

}
