// account.routes.ts
import { Routes } from '@angular/router';
import { AccountListComponent } from './account-list.component';
import { AccountUpdateComponent } from './account-update.component';



export const accountRoutes: Routes = [
  {
    path: '',
    component: AccountListComponent,
    title: 'Account'
  },
  {
    path: 'new',
    component: AccountUpdateComponent,
    title: 'Create Account'
  },
  {
    path: ':id/edit',
    component: AccountUpdateComponent,
    title: 'Edit Account'
  },
  {
    path: ':id/view',
    component: AccountUpdateComponent,
    title: 'View Account'
  }
];
