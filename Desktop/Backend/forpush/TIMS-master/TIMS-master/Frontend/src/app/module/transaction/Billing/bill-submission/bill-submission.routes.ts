// bill-submission.routes.ts
import { Routes } from '@angular/router';
import { BillSubmissionListComponent } from './bill-submission-list.component';
import { BillSubmissionUpdateComponent } from './bill-submission-update.component';

export const billSubmissionRoutes: Routes = [
  {
    path: '',
    component: BillSubmissionListComponent,
    title: 'Bill Submissions'
  },
  {
    path: 'new',
    component: BillSubmissionUpdateComponent,
    title: 'Create Bill Submission'
  },
  {
    path: ':id/edit',
    component: BillSubmissionUpdateComponent,
    title: 'Edit Bill Submission'
  },
  {
    path: ':id/view',
    component: BillSubmissionUpdateComponent,
    title: 'View Bill Submission'
  }
];
