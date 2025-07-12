import { Routes } from '@angular/router';
import { DocketEnquiryViewComponent } from './docket-enquiry-view.component';

export const docketEnquiryRoutes: Routes = [
  {
    path: '',
    component: DocketEnquiryViewComponent,
    title: 'Docket Enquiry'
  },
  {
    path: ':id/view',
    component: DocketEnquiryViewComponent,
    title: 'View Docket Enquiry'
  }
];
