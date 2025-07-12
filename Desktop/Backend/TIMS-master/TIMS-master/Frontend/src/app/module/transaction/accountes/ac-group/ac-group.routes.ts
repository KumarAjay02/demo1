import { Routes } from '@angular/router';
import { AcGroupListComponent } from './ac-group-list.component';
import { AcGroupUpdateComponent } from './ac-group-update.component';

export const acGroupRoutes: Routes = [
  {
    path: '',
    component: AcGroupListComponent,
    title: 'Account Group'
  },
  {
    path: 'new',
    component: AcGroupUpdateComponent,
    title: 'Create Account Group'
  },
  {
    path: ':id/edit',
    component: AcGroupUpdateComponent,
    title: 'Edit Account Group'
  },
  {
    path: ':id/view',
    component: AcGroupUpdateComponent,
    title: 'View Account Group'
  }
];
