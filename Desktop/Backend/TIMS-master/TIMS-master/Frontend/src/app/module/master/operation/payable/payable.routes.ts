// payable.routes.ts
import { Routes } from '@angular/router';
import { PayableListComponent } from './payable-list.component';
import { PayableUpdateComponent } from './payable-update.component';

export const payableRoutes: Routes = [
  {
    path: '',
    component: PayableListComponent,
    title: 'Payable Master'
  },
  {
    path: 'new',
    component: PayableUpdateComponent,
    title: 'Create Payable'
  },
  {
    path: ':id/edit',
    component: PayableUpdateComponent,
    title: 'Edit Payable'
  },
  {
    path: ':id/view',
    component: PayableUpdateComponent,
    title: 'View Payable'
  }
];
