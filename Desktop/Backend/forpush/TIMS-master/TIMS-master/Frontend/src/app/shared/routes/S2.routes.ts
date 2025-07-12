import { Routes } from '@angular/router';
import { BulkDocketUpdateRoute } from '../../module/transaction/Billing/bulk-docket-update/bulkdocketupdate.route';
import { customerrateroute } from '../../module/transaction/Billing/customer-rate/CustomerRate.route';
import { einvoiceRoute } from '../../module/transaction/Billing/einvoice/einvoice.route';
import { docketEntryRoutes } from '../../module/transaction/operations/docket-entry/docket-entry.routes';

 

export const s2Routes: Routes = [
  // Operations module routes

      { path:'docket-entry', children: docketEntryRoutes },
      {path:'customerratelist',children:customerrateroute},
      {path:'einvoice',children:einvoiceRoute},
      {path:'BulkDocketFreightUpdate',children:BulkDocketUpdateRoute}

];
