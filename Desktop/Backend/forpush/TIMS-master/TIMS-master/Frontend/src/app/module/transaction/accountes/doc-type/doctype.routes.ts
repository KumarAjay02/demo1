// doctype.routes.ts
import { Routes } from '@angular/router';
import { DoctypeListComponent } from './doctype-list.component';
import { DoctypeUpdateComponent } from './doctype-update.component';


export const doctypeRoutes: Routes = [
  {
    path: '',
    component: DoctypeListComponent,
    title: 'Document Type'
  },
  {
    path: 'new',
    component: DoctypeUpdateComponent,
    title: 'Create Document Type'
  },
  {
    path: ':id/edit',
    component: DoctypeUpdateComponent,
    title: 'Edit Document Type'
  },
  {
    path: ':id/view',
    component: DoctypeUpdateComponent,
    title: 'View Document Type'
  }
];
