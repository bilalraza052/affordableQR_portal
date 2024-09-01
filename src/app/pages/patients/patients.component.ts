import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../shared-component/page-header/page-header.component';
import { SetupListComponent } from '../../shared-component/setup-list/setup-list.component';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [PageHeaderComponent,SetupListComponent],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent {
  datasource:any[]=[
    {
      id:'Alfalo',
      numOfProvider:'Alexis Alfaro',
      numOfPatients:'149',


    },
    {
      id:'Alfalo',
      numOfProvider:'Alexis Alfaro',
      numOfPatients:'149',


    },
    {
      id:'Alfalo',
      numOfProvider:'Alexis Alfaro',
      numOfPatients:'149',


    },
    {
      id:'Alfalo',
      numOfProvider:'Alexis Alfaro',
      numOfPatients:'149',


    },
    {
      id:'Alfalo',
      numOfProvider:'Alexis Alfaro',
      numOfPatients:'149',


    },
    {
      id:'Alfalo',
      numOfProvider:'Alexis Alfaro',
      numOfPatients:'149',


    },
  ]
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
      label:'',
      key:'edit',
      displayType:'edit'

    }
  ]

}
