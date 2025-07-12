import { Routes } from '@angular/router';
 
import { GstratemstRoute } from '../../module/master/account/gstratemst/gstratemst.routes';
import { FinancialYearOpeningRoute } from '../../module/master/account/financialyearopening/financialyearopening.route';
import { TdsratemstRoutes } from '../../module/master/account/tdsratemst/tdsratemst.route';
 
import { PantaxRoute } from '../../module/master/account/pantaxmst/pantax.route';
import { VendorvehicleratemstRoutes } from '../../module/master/account/vendorvehicleratemst/vendorvehicleratemst.routes';
import { billRoutes } from '../../module/transaction/Billing/create-bill/bill.routes';
import { AwbChallanRoutes } from '../../module/transaction/operations/awbchallan/awbchallan.Route';
import { HopodReceivedRoute } from '../../module/transaction/operations/hopodreceived/hopodreceived.route';
import { marketvehicleapprovalRoute } from '../../module/transaction/operations/market-vehicle-approval/marketvehicleapprovalRoute';
 

export const s1Routes: Routes = [

      {path: 'create-bill', children: billRoutes },
      {path:'gstratemst',children:GstratemstRoute},
      {path:'financialyearopening',children:FinancialYearOpeningRoute},
      {path:'tdsratemst',children:TdsratemstRoutes},
      {path:'market-vehicle-approval',children:marketvehicleapprovalRoute},
      {path:'pantaxmst',children:PantaxRoute},
      {path:'vendorvehiclerate',children:VendorvehicleratemstRoutes},
      {path:'AwbChallanmst',children:AwbChallanRoutes},
      {path:'hopodReceived',children:HopodReceivedRoute},
      
      
      

];
