import { Component } from '@angular/core';
import { PageHeaderComponent } from "../../shared-component/page-header/page-header.component";
import { SetupListComponent } from "../../shared-component/setup-list/setup-list.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [PageHeaderComponent, SetupListComponent],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.scss'
})
export class GroupListComponent {
  constructor(public router:Router){

  }
  datasource:any[]=[]
  columns:any[]=[
    {
      label:'Name',
      key:'name'

    },
    {
      label:'Speciality',
      key:'speciality'

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
  ]
  onRowClick(ev:any){
    this.router.navigate(['detail'])

  }

}
