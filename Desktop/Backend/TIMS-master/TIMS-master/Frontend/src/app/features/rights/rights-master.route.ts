// state.routes.ts
import { Routes } from '@angular/router';
import { RightsListComponent } from './rights-list.component';

export const rightsRoutes: Routes = [
  {
    path: '',
    component: RightsListComponent,
    title: 'User Rights'
  },
];
