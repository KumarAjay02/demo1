
import { Routes } from '@angular/router';
import { MarketVehicleApprovalComponent } from './market-vehicle-approval.component';
import { MarketVehicleApprovalFormComponent } from './form/market-vehicle-approval-form.component';

export const marketvehicleapprovalRoute: Routes = [
  {
    path: '',
    component: MarketVehicleApprovalComponent ,
  },
  {
    path: 'new',
    component: MarketVehicleApprovalFormComponent,
    title: 'Create marketvehicleapproval'
  },
  {
    path: ':id/edit',
    component: MarketVehicleApprovalFormComponent,
    title: 'Edit marketvehicleapproval'
  },
  {
    path: ':id/view',
    component: MarketVehicleApprovalFormComponent,
    title: 'View marketvehicleapproval'
  }
];
