import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'iot-dashboard',
    component: DashboardComponent,
  },
  {
    path: 'nfv-configuration',
    loadChildren: './nfv-configuration/nfv-configuration.module#NfvConfigurationModule',
  }
    , {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
