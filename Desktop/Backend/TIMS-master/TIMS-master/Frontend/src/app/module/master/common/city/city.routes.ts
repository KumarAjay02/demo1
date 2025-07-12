// city.routes.ts
import { Routes } from '@angular/router';
import { CityListComponent } from './city-list.component';
import { CityUpdateComponent } from './city-update.component';

export const cityRoutes: Routes = [
  {
    path: '',
    component: CityListComponent,
    title: 'Cities'
  },
  {
    path: 'new',
    component: CityUpdateComponent,
    title: 'Create City'
  },
  {
    path: ':id/edit',
    component: CityUpdateComponent,
    title: 'Edit City'
  },
  {
    path: ':id/view',
    component: CityUpdateComponent,
    title: 'View City'
  }
];
