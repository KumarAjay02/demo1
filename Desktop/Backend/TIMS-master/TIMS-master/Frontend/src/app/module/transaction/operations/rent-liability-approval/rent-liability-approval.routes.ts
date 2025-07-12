import { Routes } from '@angular/router';
import { RentLiabilityApprovalListComponent } from './rent-liability-approval-list.component';
import { RentLiabilityApprovalUpdateComponent } from './rent-liability-approval-update.component';

export const rentLiabilityApprovalRoutes: Routes = [
  {
    path: '',
    component: RentLiabilityApprovalListComponent,
    title: 'Rent Liability Approvals'
  },
  {
    path: 'new',
    component: RentLiabilityApprovalUpdateComponent,
    title: 'Create Rent Liability Approval'
  },
  {
    path: ':id/edit',
    component: RentLiabilityApprovalUpdateComponent,
    title: 'Edit Rent Liability Approval'
  },
  {
    path: ':id/view',
    component: RentLiabilityApprovalUpdateComponent,
    title: 'View Rent Liability Approval'
  }
];
