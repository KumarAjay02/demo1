// interbranch-ft.routes.ts
import { Routes } from '@angular/router';
import { InterBranchFundTransferListComponent } from './interbranch-ft-list.component';
import { InterBranchFundTransferUpdateComponent } from './interbranch-ft-update.component';

export const InterBranchFundTransferRoutes: Routes = [
  {
    path: '',
    component: InterBranchFundTransferListComponent,
    title: 'Account'
  },
  {
    path: 'new',
    component: InterBranchFundTransferUpdateComponent,
    title: 'Create Inter branch Fund Transfer'
  },
  {
    path: ':id/edit',
    component: InterBranchFundTransferUpdateComponent,
    title: 'Edit Inter branch Fund Transfer'
  },
  {
    path: ':id/view',
    component: InterBranchFundTransferUpdateComponent,
    title: 'View Inter branch Fund Transfer'
  }
];
