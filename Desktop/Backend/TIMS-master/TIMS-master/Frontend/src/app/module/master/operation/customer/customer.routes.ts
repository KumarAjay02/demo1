import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list.component';
import { CustomerUpdateComponent } from './customer-update.component';

export const customerRoutes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
    title: 'Customers'
  },
  {
    path: 'new',
    component: CustomerUpdateComponent,
    title: 'Create Customer'
  },
  {
    path: ':coCode/:divCode/:customerCode/edit',
    component: CustomerUpdateComponent,
    title: 'Edit Customer'
  },
  {
    path: ':coCode/:divCode/:customerCode/view',
    component: CustomerUpdateComponent,
    title: 'View Customer'
  }
];
