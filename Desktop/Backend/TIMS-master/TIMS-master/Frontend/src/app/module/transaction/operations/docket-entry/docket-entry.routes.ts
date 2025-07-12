import { Routes } from '@angular/router';
import { DocketEntryListComponent } from './docket-entry-list.component';
import { DocketEntryUpdateComponent } from './docket-entry-update.component';

export const docketEntryRoutes: Routes = [
  {
    path: '',
    component: DocketEntryListComponent,
    title: 'Docket Entry List'
  },
  {
    path: 'create',
    component: DocketEntryUpdateComponent,
    title: 'Create Docket Entry'
  },
  {
    path: ':id/edit',
    component: DocketEntryUpdateComponent,
    title: 'Edit Docket Entry'
  },
  {
    path: ':id/view',
    component: DocketEntryUpdateComponent,
    title: 'View Docket Entry'
  }
];
