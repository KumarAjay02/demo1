// doctype.routes.ts
import { Routes } from '@angular/router';
import { CosttypeListComponent } from './costtype-list.component';
import { CosttypeUpdateComponent } from './costtype-update.component';



export const costtypeRoutes: Routes = [
  {
    path: '',
    component: CosttypeListComponent,
    title: 'Cost Code Type'
  },
  {
    path: 'new',
    component: CosttypeUpdateComponent,
    title: 'Create Cost Code Type'
  },
  {
    path: ':id/edit',
    component: CosttypeUpdateComponent,
    title: 'Edit Cost Code Type'
  },
  {
    path: ':id/view',
    component: CosttypeUpdateComponent,
    title: 'View Cost Code Type'
  }
];
