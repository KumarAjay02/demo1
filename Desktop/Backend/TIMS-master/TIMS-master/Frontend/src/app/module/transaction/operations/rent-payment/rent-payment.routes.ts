import { Routes } from '@angular/router';
import { RentPaymentListComponent } from './rent-payment-list.component';
import { RentPaymentUpdateComponent } from './rent-payment-update.component';

export const rentPaymentRoutes: Routes = [
  {
    path: '',
    component: RentPaymentListComponent,
    title: 'Rent Payments'
  },
  {
    path: 'new',
    component: RentPaymentUpdateComponent,
    title: 'Create Rent Payment'
  },
  {
    path: ':id/edit',
    component: RentPaymentUpdateComponent,
    title: 'Edit Rent Payment'
  },
  {
    path: ':id/view',
    component: RentPaymentUpdateComponent,
    title: 'View Rent Payment'
  }
];
