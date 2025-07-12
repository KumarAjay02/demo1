import { Routes } from '@angular/router';
import { MrTransferAdjustmentListComponent } from './mr-transfer-adjustment-list.component';
import { MrTransferAdjustmentUpdateComponent } from './mr-transfer-adjustment-update.component';

export const mrTransferAdjustmentRoutes: Routes = [
  {
    path: '',
    component: MrTransferAdjustmentListComponent,
    title: 'MR Cheque Entry & Adjustment'
  },
  {
    path: 'new',
    component: MrTransferAdjustmentUpdateComponent,
    title: 'Create MR Cheque Entry & Adjustment'
  },
  {
    path: ':id/edit',
    component: MrTransferAdjustmentUpdateComponent,
    title: 'Edit MR Cheque Entry & Adjustment'
  },
  {
    path: ':id/view',
    component: MrTransferAdjustmentUpdateComponent,
    title: 'View MR Cheque Entry & Adjustment'
  }
];
