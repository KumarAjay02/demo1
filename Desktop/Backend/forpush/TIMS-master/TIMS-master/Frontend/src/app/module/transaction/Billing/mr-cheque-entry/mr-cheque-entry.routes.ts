// mr-cheque-entry.routes.ts
import { Routes } from '@angular/router';
import { MrChequeEntryListComponent } from './mr-cheque-entry-list.component';
import { MrChequeEntryUpdateComponent } from './mr-cheque-entry-update.component';

export const mrChequeEntryRoutes: Routes = [
  {
    path: '',
    component: MrChequeEntryListComponent,
    title: 'MR Cheque Entries'
  },
  {
    path: 'new',
    component: MrChequeEntryUpdateComponent,
    title: 'Create MR Cheque Entry'
  },
  {
    path: ':id/edit',
    component: MrChequeEntryUpdateComponent,
    title: 'Edit MR Cheque Entry'
  },
  {
    path: ':id/view',
    component: MrChequeEntryUpdateComponent,
    title: 'View MR Cheque Entry'
  }
];
