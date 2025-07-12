// bank.routes.ts
import { Routes } from '@angular/router';
import { BankListComponent } from './bank-list.component';
import { BankUpdateComponent } from './bank-update.component';

export const bankRoutes: Routes = [
  {
    path: '',
    component: BankListComponent,
    title: 'Bank'
  },
  {
    path: 'new',
    component: BankUpdateComponent,
    title: 'Create Bank'
  },
  {
    path: ':id/edit',
    component: BankUpdateComponent,
    title: 'Edit Bank'
  },
  {
    path: ':id/view',
    component: BankUpdateComponent,
    title: 'View Bank'
  }
];
