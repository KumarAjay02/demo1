import { Routes } from '@angular/router';
import { BookingBasisRoutes } from '../../module/master/booking-basicmst/bookingbasic.routes';
import { ChargesMstComponent } from '../../module/master/operation/charges-mst/charges-mst.component';
import { currencymasterRoutes } from '../../module/master/operation/currency-master/currencymasterRoutes';
import { materialmstRoutes } from '../../module/master/operation/material-master/materialmst.routes';
import { packingmstRoute } from '../../module/master/operation/packing-mst/packingmst.route';
import { RoutemstComponent } from '../../module/master/operation/routemst/routemst.component';
import { ServiceModeRoutes } from '../../module/master/operation/service-modemst/servicemode.route';
import { vehicleCapacityRoutes } from '../../module/master/operation/vehicle-capacity-master/vehicleCapacityRoutes';
import { VehicletrackingMstComponent } from '../../module/master/operation/vehicletracking -mst/vehicletracking-mst.component';
import { costCenterRoutes } from '../../module/transaction/accountes/costCenter/costCenterRoutes';
import { creditNoteRoutes } from '../../module/transaction/accountes/credit-Note/creditNoteRoutes';
import { debitNoteRoutes } from '../../module/transaction/accountes/debit -Note/debitNoteRoutes';
import { netSalaryPaymentRoutes } from '../../module/transaction/accountes/net-Salary-Payment/netSalaryPaymentRoutes';
import { billdispatchreceiveRoutes } from '../../module/transaction/Billing/bill-dispatch-receive/billdispatchreceiveRoutes';
import { hoPodCodDispatchReceiveRoutes } from '../../module/transaction/operations/hop-od-cod-dispatch-received/hoPodCodDispatchReceiveRoutes';
import { MiniDocketMstComponent } from '../../module/transaction/operations/mini-docket/mini-docket-mst.component';
import { StationaryAllocationMstComponent } from '../../module/transaction/operations/stationary-allocation/stationary-allocation-mst.component';
import { StationaryRecieveComponent } from '../../module/transaction/operations/stationary-recieve/stationary-recieve.component';
import { TallysheetMstComponent } from '../../module/transaction/operations/tallysheet-mst/tallysheet-mst.component';
import { marketvehiclerequestRoutes } from '../../module/transaction/operations/Market-Vehicle-Request/marketvehiclerequestRoutes';
 
// import { debitNoteRoutes } from '../../module/accountes/debit -Note/debit-note/debitNoteRoutes';

export const a1Routes: Routes = [
  // Operations module routes
     
         
        { path: 'materialmst', children: materialmstRoutes },
        { path: 'packingmst', children: packingmstRoute },
        {path:'',component:RoutemstComponent},
        { path: 'serviceModemst', children: ServiceModeRoutes },
        {path:'',component:ChargesMstComponent,title:'Charge master'},
        { path: 'bookingbasicmst', children: BookingBasisRoutes },
        { path: 'vehicle-master-capacity', children: vehicleCapacityRoutes },
        { path: '',component: MiniDocketMstComponent,},
        {  path: '', component: StationaryAllocationMstComponent, },
        {  path: '', component: TallysheetMstComponent, },
        {path:'',component:VehicletrackingMstComponent},
        //02june
        {path:'stationaryRecieve',component:StationaryRecieveComponent},
       {path:'marketvehicleRequest',children:marketvehiclerequestRoutes},
        {path:'CurrencyMaster',children:currencymasterRoutes},
        {path:'CostCenterMaster',children:costCenterRoutes},
        {path:'debitnote',children:debitNoteRoutes},
        {path:'natSalaryPayment',children:netSalaryPaymentRoutes,},
        {path:'billDispatchAndReceive',children:billdispatchreceiveRoutes},
        {path:'HOPODCODDispatchReceive',children:hoPodCodDispatchReceiveRoutes},
        {path:'creditNote',children:creditNoteRoutes}
        

];
