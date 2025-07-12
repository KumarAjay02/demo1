// road-tcs.routes.ts
import { Routes } from '@angular/router';
import { RoadTcsListComponent } from './road-tcs-list.component';
import { RoadTcsUpdateComponent } from './road-tcs-update.component';

export const roadTcsRoutes: Routes = [
  {
    path: '',
    component: RoadTcsListComponent,
    title: 'Road TCS Master'
  },
  {
    path: 'new',
    component: RoadTcsUpdateComponent,
    title: 'Create Road TCS'
  },
  {
    path: ':id/edit',
    component: RoadTcsUpdateComponent,
    title: 'Edit Road TCS'
  },
  {
    path: ':id/view',
    component: RoadTcsUpdateComponent,
    title: 'View Road TCS'
  }
];
