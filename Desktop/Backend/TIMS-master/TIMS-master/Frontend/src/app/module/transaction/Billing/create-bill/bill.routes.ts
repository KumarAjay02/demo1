// bill.routes.ts
import { Routes } from '@angular/router';
import { BillListComponent } from './bill-list.component';
import { BillUpdateComponent } from './bill-update.component';

export const billRoutes: Routes = [
  {
    path: '',
    component: BillListComponent,
    title: 'Bill Management'
  },
  {
    path: 'new',
    component: BillUpdateComponent,
    title: 'Create Bill'
  },
  {
    path: ':id/edit',
    component: BillUpdateComponent,
    title: 'Edit Bill'
  },
  {
    path: ':id/view',
    component: BillUpdateComponent,
    title: 'View Bill'
  }
];
