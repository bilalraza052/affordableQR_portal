import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../shared-component/page-header/page-header.component';
import { SetupListComponent } from '../../shared-component/setup-list/setup-list.component';
import { BaseController } from '../../base.controller';
import { MainServiceService } from '../../services/main-service.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [PageHeaderComponent,SetupListComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent extends BaseController<any> {
  datasource:any[]=[]
  columns:any[]=[
    {
      label:'First Name',
      key:'firstName',
      objectName:'user'
    },
    {
      label:'Last Name',
      key:'lastName',
      objectName:'user'
    },
    {
      label:'Document Name',
      key:'fileType'

    },
    {
      label:"Url",
      key:'fileLink',
      displayType:'download',
    }
  
    // {
    //   label:'Role',
    //   key:'role',

    // },
  ]
  async notifications(){
    const res= await (await this.mainSerice.uploaded()).toPromise();
    if(!res.IsSuccessful){
      return this.showError(res.Errors)
    }
    this.datasource = res.Data

  }
  constructor(public mainSerice:MainServiceService){
    super();
  }
  ngOnInit(){
    this.notifications()
  }
}
