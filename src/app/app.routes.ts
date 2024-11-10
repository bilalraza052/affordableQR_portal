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
import { AuthGuard } from './Guards/auth.guard';
import { UsersComponent } from './pages/users/users.component';
import { RegisterComponent } from './pages/register/register.component';
import { RightsGuard } from './Guards/rights.guard';
import { NotificationComponent } from './pages/notification/notification.component';

export const routes: Routes = [
  {
    path:'',
    component:MainLayoutComponent,
    canActivateChild:[AuthGuard,RightsGuard],
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
        path:'users', component:UsersComponent
      },
      {
        path:'add-users', component:RegisterComponent
      },
      {
        path:'detail', component:DetailComponent
      },
      {
        path:'detail-overview', component:DetailOverviewComponent
      },
      {
        path:'notification', component:NotificationComponent
      },


    ]
  },
  {
    path:'auth',
    component:AuthComponent
  }
];
