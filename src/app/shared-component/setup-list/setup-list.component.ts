import { Component, EventEmitter, Input, Output, output } from '@angular/core';

@Component({
  selector: 'app-setup-list',
  standalone: true,
  imports: [],
  templateUrl: './setup-list.component.html',
  styleUrl: './setup-list.component.scss'
})
export class SetupListComponent {
  @Input({ required: true }) datasource: any[]=[];
  @Input({ required: true }) columns: any[]=[];
  @Output() onRowClick = new EventEmitter<any>
  // datasource:any[]=[
  //   {
  //     id:'Alfalo',
  //     numOfProvider:'Alexis Alfaro',
  //     numOfPatients:'149',
  //     score:'95.00'

  //   },
  //   {
  //     id:'Alfalo',
  //     numOfProvider:'Alexis Alfaro',
  //     numOfPatients:'149',
  //     score:'95.00'

  //   },
  //   {
  //     id:'Alfalo',
  //     numOfProvider:'Alexis Alfaro',
  //     numOfPatients:'149',
  //     score:'95.00'

  //   },
  //   {
  //     id:'Alfalo',
  //     numOfProvider:'Alexis Alfaro',
  //     numOfPatients:'149',
  //     score:'95.00'

  //   },
  //   {
  //     id:'Alfalo',
  //     numOfProvider:'Alexis Alfaro',
  //     numOfPatients:'149',
  //     score:'95.00'

  //   },
  //   {
  //     id:'Alfalo',
  //     numOfProvider:'Alexis Alfaro',
  //     numOfPatients:'149',
  //     score:'95.00'

  //   },
  // ]
  // columns:any[]=[
  //   {
  //     label:'Id',
  //     key:'id'

  //   },
  //   {
  //     label:'Number Of Providers',
  //     key:'numOfProvider'

  //   },
  //   {
  //     label:'Number Of Patients',
  //     key:'numOfPatients'

  //   },
  //   {
  //     label:'MIPS Composite Score',
  //     key:'score',
  //     displayType:'score'

  //   },
  //   {
  //     label:'',
  //     key:'edit',
  //     displayType:'edit'

  //   }
  // ]

}
