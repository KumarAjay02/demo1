// Account Schedule.routes.ts
import { Routes } from '@angular/router';
import { ACScheduleListComponent } from './ac-schedule-list.component';
import { AcScheduleUpdateComponent } from './ac-schedule-update.component';


export const acScheduleRoutes: Routes = [
  {
    path: '',
    component: ACScheduleListComponent,
    title: 'Account Schedule'
  },
  {
    path: 'new',
    component: AcScheduleUpdateComponent,
    title: 'Create Account Schedule'
  },
  {
    path: ':id/edit',
    component: AcScheduleUpdateComponent,
    title: 'Edit Account Schedule'
  },
  {
    path: ':id/view',
    component: AcScheduleUpdateComponent,
    title: 'View Account Schedule'
  }
];
