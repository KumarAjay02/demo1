// contra-voucher.routes.ts
import { Routes } from '@angular/router';
import { ContraVoucherListComponent } from './contra-voucher-list.component';
import { contraVoucherUpdateComponent } from './contra-voucher-update.component';

export const contraVoucherRoutes: Routes = [
  {
    path: '',
    component: ContraVoucherListComponent,
    title: 'Account'
  },
  {
    path: 'new',
    component: contraVoucherUpdateComponent,
    title: 'Create Contra Voucher'
  },
  {
    path: ':id/edit',
    component: contraVoucherUpdateComponent,
    title: 'Edit Contra Voucher'
  },
  {
    path: ':id/view',
    component: contraVoucherUpdateComponent,
    title: 'View Contra Voucher'
  }
];
