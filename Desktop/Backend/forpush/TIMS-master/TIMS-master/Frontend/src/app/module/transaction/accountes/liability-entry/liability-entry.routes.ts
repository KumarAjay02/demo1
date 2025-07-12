import { Routes } from '@angular/router';
import { LiabilityEntryListComponent } from './liability-entry-list.component';
import { LiabilityEntryUpdateComponent } from './liability-entry-update.component';

export const liabilityEntryRoutes: Routes = [
  {
    path: '',
    component: LiabilityEntryListComponent,
    title: 'Liability Entries'
  },
  {
    path: 'new',
    component: LiabilityEntryUpdateComponent,
    title: 'Create Liability Entry'
  },
  {
    path: ':id/edit',
    component: LiabilityEntryUpdateComponent,
    title: 'Edit Liability Entry'
  },
  {
    path: ':id/view',
    component: LiabilityEntryUpdateComponent,
    title: 'View Liability Entry'
  },
  {
    path: ':id/approve',
    component: LiabilityEntryUpdateComponent,
    title: 'Approve Liability Entry'
  }
];
