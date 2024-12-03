import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../shared-component/page-header/page-header.component';
import { SetupListComponent } from '../../shared-component/setup-list/setup-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-providers-list',
  standalone: true,
  imports: [PageHeaderComponent,SetupListComponent],
  templateUrl: './providers-list.component.html',
  styleUrl: './providers-list.component.scss'
})
export class ProvidersListComponent {
  constructor(public router:Router){

  }
   datasource:any[]=[]
  columns:any[]=[
    {
      label:'Id',
      key:'id'

    },
    {
      label:'Number Of Providers',
      key:'numOfProvider'

    },
    {
      label:'Number Of Patients',
      key:'numOfPatients'

    },
    {
      label:'MIPS Composite Score',
      key:'score',
      displayType:'score'

    },
    {
      label:'',
      key:'edit',
      displayType:'edit'

    }
  ]
  onRowClick(ev:any){
    this.router.navigate(['detail'])

  }

}
