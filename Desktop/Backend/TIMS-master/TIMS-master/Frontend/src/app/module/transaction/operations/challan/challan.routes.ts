// challan.routes.ts
import { Routes } from '@angular/router';
import { ChallanListComponent } from './challan-list.component';
import { ChallanUpdateComponent } from './challan-update.component';
import {DrsCloseComponent} from './drs-close.component';

export const challanRoutes: Routes = [
  {
    path: '',
    component: ChallanListComponent,
    title: 'Challan Entry'
  },
  {
    path: 'new',
    component: ChallanUpdateComponent,
    title: 'Create Challan'
  },
  {
    path: ':id/edit',
    component: ChallanUpdateComponent,
    title: 'Edit Challan'
  },
  {
    path: ':id/drs',
    component: DrsCloseComponent,
    title: 'DRS Close'
  },
  {
    path: ':id/view',
    component: ChallanUpdateComponent,
    title: 'View Challan'
  }
];
