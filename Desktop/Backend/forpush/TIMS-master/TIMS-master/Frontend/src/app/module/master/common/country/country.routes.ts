// country.routes.ts
import { Routes } from '@angular/router';
import { CountryListComponent } from './country-list.component';
import { CountryUpdateComponent } from './country-update.component';

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryListComponent,
    title: 'Countries'
  },
  {
    path: 'new',
    component: CountryUpdateComponent,
    title: 'Create Country'
  },
  {
    path: 'edit/:id',
    component: CountryUpdateComponent,
    title: 'Edit Country'
  },
  {
    path: 'view/:id',
    component: CountryUpdateComponent,
    title: 'View Country'
  }
];
