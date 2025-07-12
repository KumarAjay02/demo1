// voucherentry.routes.ts
import { Routes } from '@angular/router';
import { voucherentryListComponent } from './voucherentry-list.component';
import { voucherentryUpdateComponent } from './voucherentry-update.component';

export const voucherentryRoutes: Routes = [
  {
    path: '',
    component: voucherentryListComponent,
    title: 'Voucher Eentry'
  },
  {
    path: 'new',
    component: voucherentryUpdateComponent,
    title: 'Create Voucher Eentry'
  },
  {
    path: ':id/edit',
    component: voucherentryUpdateComponent,
    title: 'Edit Voucher Eentry'
  },
  {
    path: ':id/view',
    component: voucherentryUpdateComponent,
    title: 'View Voucher Eentry'
  }
];
