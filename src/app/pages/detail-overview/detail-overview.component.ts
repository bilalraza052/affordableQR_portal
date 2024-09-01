import { Component } from '@angular/core';

@Component({
  selector: 'app-detail-overview',
  standalone: true,
  imports: [],
  templateUrl: './detail-overview.component.html',
  styleUrl: './detail-overview.component.scss'
})
export class DetailOverviewComponent {
  tabIndex = 0
  back(){
    history.back()
  }

}
