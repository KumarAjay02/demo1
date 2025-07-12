
// journalvoucher.routes.ts
import { Routes } from '@angular/router';
import { journalvoucherListComponent } from './journalvoucher-list.component';
import { journalvoucherUpdateComponent } from './journalvoucher-update.component';


export const journalvoucherRoutes: Routes = [
  {
    path: '',
    component: journalvoucherListComponent,
    title: 'Journal Voucher'
  },
  {
    path: 'new',
    component: journalvoucherUpdateComponent,
    title: 'Create Journal Voucher'
  },
  {
    path: ':id/edit',
    component: journalvoucherUpdateComponent,
    title: 'Edit Journal Voucher'
  },
  {
    path: ':id/view',
    component: journalvoucherUpdateComponent,
    title: 'View Journal Voucher'
  }
];
