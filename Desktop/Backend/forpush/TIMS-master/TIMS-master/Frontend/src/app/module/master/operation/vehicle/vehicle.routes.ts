// vehicle.routes.ts
import { Routes } from '@angular/router';
import { VehicleListComponent } from './vehicle-list.component';
import { VehicleUpdateComponent } from './vehicle-update.component';

export const vehicleRoutes: Routes = [
  {
    path: '',
    component: VehicleListComponent,
    title: 'Vehicles'
  },
  {
    path: 'new',
    component: VehicleUpdateComponent,
    title: 'Create Vehicle'
  },
  {
    path: ':id/edit',
    component: VehicleUpdateComponent,
    title: 'Edit Vehicle'
  },
  {
    path: ':id/view',
    component: VehicleUpdateComponent,
    title: 'View Vehicle'
  }
];
