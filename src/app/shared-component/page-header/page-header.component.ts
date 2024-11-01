import { Component, Input } from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
  @Input('pageTitle') title:string= ''
  @Input('isRefresh') isRefresh:boolean= true;
  usersInfo: any;

  constructor(){
    const info = localStorage.getItem('user');
    if(info){
      this.usersInfo = JSON.parse(info)
    }
  }

}
