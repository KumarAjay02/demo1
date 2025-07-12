import { Routes } from '@angular/router';
import { BLPLDispInfoListComponent } from './bl-pl-disp-info-list.component';
import { BlPlDispInfoUpdateComponent } from './bl-pl-disp-info-update.component';


export const bl_pl_dispInfo: Routes = [
  {
    path: '',
    component: BLPLDispInfoListComponent,
    title: 'Balance Sheet and Profit & Loss Display'
  },
  {
    path: 'new',
    component: BlPlDispInfoUpdateComponent,
    title: 'Create Balance Sheet and Profit & Loss Display'
  },
  {
    path: ':id/edit',
    component: BlPlDispInfoUpdateComponent,
    title: 'Edit Balance Sheet and Profit & Loss Display'
  },
  {
    path: ':id/view',
    component: BlPlDispInfoUpdateComponent,
    title: 'View Balance Sheet and Profit & Loss Display'
  }
];
