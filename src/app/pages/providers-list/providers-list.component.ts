import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../shared-component/page-header/page-header.component';
import { SetupListComponent } from '../../shared-component/setup-list/setup-list.component';
import { Router } from '@angular/router';
import { MainServiceService } from '../../services/main-service.service';
import { BaseController } from '../../base.controller';

@Component({
  selector: 'app-providers-list',
  standalone: true,
  imports: [PageHeaderComponent,SetupListComponent],
  templateUrl: './providers-list.component.html',
  styleUrl: './providers-list.component.scss'
})
export class ProvidersListComponent extends BaseController<any> {
  scoring: any;
  constructor(public router:Router,public service:MainServiceService){
    super();
  }

  async getPatients(){
    const res= await(await this.service.Get('provider')).toPromise();
    if(!res.IsSuccessful) return this.showError(res.Errors);
    this.datasource  = res.Data
  }
  async getScoring(){
    const res= await(await this.service.Get('scoring')).toPromise();
    if(!res.IsSuccessful) return this.showError(res.Errors);
    this.scoring  = res.Data
  }
  ngOnInit(){
    this.getScoring()
    this.getPatients()
  }
   datasource:any[]=[]
   columns:any[]=[
    {
      label:'First Name',
      key:'first_name'

    },
    {
      label:'Last Name',
      key:'last_name'

    },
    {
      label:'Age',
      key:'age'

    },
    {
      label:'Gender',
      key:'sex'

    },
    {
      label:'Date Of Birth',
      key:'dob'

    },
    {
      label:'Date Of Service',
      key:'dos'

    },
    {
      label:'Diagnosis',
      key:'diagnosis'

    },
    {
      label:'CPT',
      key:'cpt'

    },
    {
      label:'CQM',
      key:'cqm'

    },
    {
      label:'Billing',
      key:'billing'

    },
    {
      label:'MRN',
      key:'mrn'

    },
    {
      label:'Provider Name',
      key:'provider_name'

    },
    {
      label:'Provider NPI',
      key:'provider_npi'

    },

  ]
  
  
  

}
