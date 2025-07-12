import { Routes } from '@angular/router';
 
//import {rentAgreementRoutes} from '../../module/operations/rent-agreement/rent-agreement.routes';
//import {rentLiabilityApprovalRoutes} from '../../module/operations/rent-liability-approval/rent-liability-approval.routes';
 
import {userCreationRoutes} from '../../features/user-creation/user-creation.routes';
import { vehicleRoutes } from '../../module/master/operation/vehicle/vehicle.routes';
import { liabilityEntryRoutes } from '../../module/transaction/accountes/liability-entry/liability-entry.routes';
import { tcsPaymentRoutes } from '../../module/transaction/accountes/tcs-payment/tcs-payment.routes';
import { mrTransferAdjustmentRoutes } from '../../module/transaction/Billing/mr-cheque-adjustment/mr-transfer-adjustment.routes';
import { rentAgreementRoutes } from '../../module/transaction/operations/rent-agreement/rent-agreement.routes';
import { rentLiabilityApprovalRoutes } from '../../module/transaction/operations/rent-liability-approval/rent-liability-approval.routes';
import { rentPaymentRoutes } from '../../module/transaction/operations/rent-payment/rent-payment.routes';




export const r1Routes: Routes = [


  { path: 'vehicle-master', children: vehicleRoutes },
  { path: 'tcs-payments', children: tcsPaymentRoutes },
  {path:'rent-agreements',children:rentAgreementRoutes },
  {path:'rent-liability-approvals',children:rentLiabilityApprovalRoutes },
  {path:'liability-entries',children:liabilityEntryRoutes},


  {path:'mr-cheque-adjustments',children:mrTransferAdjustmentRoutes},
  {path:'rent-agreements',children:rentAgreementRoutes },
  {path:'rent-payments',children:rentPaymentRoutes},


   {path:'mr-cheque-adjustments',children:mrTransferAdjustmentRoutes},
  {path:'rent-agreements',children:rentAgreementRoutes },
  {path:'rent-payments',children:rentPaymentRoutes },


   {path:'mr-cheque-adjustments',children:mrTransferAdjustmentRoutes},
  {path:'rent-agreements',children:rentAgreementRoutes },
  {path:'rent-payments',children:rentPaymentRoutes },
  {path:'users',children:userCreationRoutes}


];
