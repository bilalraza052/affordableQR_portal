import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../shared-component/page-header/page-header.component';
import { SetupListComponent } from '../../shared-component/setup-list/setup-list.component';
import { BaseController } from '../../base.controller';
import { MainServiceService } from '../../services/main-service.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [PageHeaderComponent, SetupListComponent],

  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent extends BaseController<any> {
  datasource:any[]=[]
  columns:any[]=[
    {
      label:'First Name',
      key:'firstName'

    },
    {
      label:'Last Name',
      key:'lastName'

    },
    {
      label:'User Name',
      key:'userName'

    },
    {
      label:'Organization',
      key:'organization'

    },
    {
      label:'Email',
      key:'email',

    },
    // {
    //   label:'Role',
    //   key:'role',

    // },
  ]
  constructor(public mainSerice:MainServiceService){
    super();
  }
  async users(){
    const res= await (await this.mainSerice.users()).toPromise();
    if(!res.IsSuccessful){
      return this.showError(res.Errors)
    }
    this.datasource = res.Data

  }


  ngOnInit(){
    this.users()

  }

}