import { Routes } from '@angular/router';
import { TcsPaymentListComponent } from './tcs-payment-list.component';
import { TcsPaymentUpdateComponent } from './tcs-payment-update.component';

export const tcsPaymentRoutes: Routes = [
  {
    path: '',
    component: TcsPaymentListComponent,
    title: 'TCS Payments'
  },
  {
    path: 'new',
    component: TcsPaymentUpdateComponent,
    title: 'Create TCS Payment'
  },
  {
    path: ':id/edit',
    component: TcsPaymentUpdateComponent,
    title: 'Edit TCS Payment'
  },
  {
    path: ':id/view',
    component: TcsPaymentUpdateComponent,
    title: 'View TCS Payment'
  }
];
