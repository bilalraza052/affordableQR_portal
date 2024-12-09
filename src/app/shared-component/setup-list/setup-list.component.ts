import { Component, EventEmitter, Input, Output, output, TemplateRef, ViewChild } from '@angular/core';
import { BaseController } from '../../base.controller';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-setup-list',
  standalone: true,
  imports: [PageHeaderComponent,MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,FormsModule,MatProgressSpinnerModule,KeyValuePipe,MatExpansionModule],

  templateUrl: './setup-list.component.html',
  styleUrl: './setup-list.component.scss'
})
export class SetupListComponent extends BaseController<any> {
  @Input({ required: true }) datasource: any[]=[];
  @Input({ required: true }) columns: any[]=[];
  @Input() isSearchable: boolean = true;
  @Input() isAdd: boolean = false;
  @Input() isGroupable: boolean = false;
  @Input() headerCaption: string = '';
  @Input() isCrud: boolean = false;
  @Input() range: any = {};
  @Output() onRowClick = new EventEmitter<any>
  @Output() onAddEditEvent = new EventEmitter<any>
  @Output() onDeleteEvent = new EventEmitter<any>
  @ViewChild('deleteDialog') deleteDialog:TemplateRef<any> | undefined
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

  constructor(){
    super()
  }
  ngOnInit(){
    if(this.isCrud){
      const columns =[
        {
          key:'edit',
          label:"Edit",
          displayType:'edit'

        },
        {
          key:'delete',
          label:"Delete",
          displayType:'delete'

        }
      ]
      this.columns =[...columns,...(this.columns || [])]
    }
  }
  openDeleteDialog(row:any){
    if(!this.deleteDialog) return;
    const dialogRef = this.dialog?.open(this.deleteDialog,{
      width:'30vw'
    })
    dialogRef?.afterClosed().subscribe(x=>{
      if(x){
        this.onDeleteEvent.emit(row)
      }
    })
  }
  ngAfterViewInit(){


  }

}
