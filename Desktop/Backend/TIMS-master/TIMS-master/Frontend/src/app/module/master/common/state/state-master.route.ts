 
import { Routes } from '@angular/router';
import { StateListComponent } from './state-list.component';
import { StateUpdateComponent } from './state-update.component';

export const stateRoutes: Routes = [
  {
    path: '',
    component: StateListComponent,
    title: 'States'
  },
  {
    path: 'new',
    component: StateUpdateComponent,
    title: 'Create State'
  },
  {
    path: ':id/edit',
    component: StateUpdateComponent,
    title: 'Edit State'
  },
  {
    path: ':id/view',
    component: StateUpdateComponent,
    title: 'View State'
  }
];
