import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { GroupListComponent } from './pages/group-list/group-list.component';
import { ProvidersListComponent } from './pages/providers-list/providers-list.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { UploadComponent } from './pages/upload/upload.component';
import { SettingComponent } from './pages/setting/setting.component';
import { DetailComponent } from './pages/detail/detail.component';
import { DetailOverviewComponent } from './pages/detail-overview/detail-overview.component';
import { AuthComponent } from './pages/auth/auth.component';

export const routes: Routes = [
  {
    path:'',
    component:MainLayoutComponent,
    // canActivateChild:[AuthGuard],
    children:[
      {
        path:'',redirectTo:'group',pathMatch:'full',
      },

      {
        path:'group', component:GroupListComponent
      },
      {
        path:'provider', component:ProvidersListComponent
      },
      {
        path:'patients', component:PatientsComponent
      },
      {
        path:'upload', component:UploadComponent
      },
      {
        path:'settings', component:SettingComponent
      },
      {
        path:'detail', component:DetailComponent
      },
      {
        path:'detail-overview', component:DetailOverviewComponent
      },


    ]
  },
  {
    path:'auth',
    component:AuthComponent
  }
];
