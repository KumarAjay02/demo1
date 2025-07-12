import { Routes } from '@angular/router';
import { RentAgreementListComponent } from './rent-agreement-list.component';
import { RentAgreementUpdateComponent } from './rent-agreement-update.component';

export const rentAgreementRoutes: Routes = [
  {
    path: '',
    component: RentAgreementListComponent,
    title: 'Rent Agreements'
  },
  {
    path: 'new',
    component: RentAgreementUpdateComponent,
    title: 'Create Rent Agreement'
  },
  {
    path: ':id/edit',
    component: RentAgreementUpdateComponent,
    title: 'Edit Rent Agreement'
  },
  {
    path: ':id/view',
    component: RentAgreementUpdateComponent,
    title: 'View Rent Agreement'
  }
];
