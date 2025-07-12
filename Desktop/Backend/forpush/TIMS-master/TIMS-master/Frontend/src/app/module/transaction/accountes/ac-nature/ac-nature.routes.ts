import { Routes } from '@angular/router';
import { AcNatureComponent } from './ac-nature-list.component';
import { AcNatureUpdateComponent } from './ac-nature-update.component';


export const acNatureRoutes: Routes = [
  {
    path: '',
    component: AcNatureComponent,
    title: 'Account Nature'
  },
  {
    path: 'new',
    component: AcNatureUpdateComponent,
    title: 'Create Account Nature'
  },
  {
    path: ':id/edit',
    component: AcNatureUpdateComponent,
    title: 'Edit Account Nature'
  },
  {
    path: ':id/view',
    component: AcNatureUpdateComponent,
    title: 'View Account Nature'
  }
];
