import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { AuthenticatedLayoutComponent } from './layouts/authenticated/authenticated-layout.component';
import { SimpleLayoutComponent } from './layouts/authenticated/simple-layout.component';
import HomeComponent from './home/home.component';

// Import all route configurations
 
 
 
import { DashboardLayoutComponent } from './features/dashboard/dashboard-layout.component';
import { r1Routes } from './shared/routes/R1.routes';
import { s1Routes } from './shared/routes/S1.routes';
import { s2Routes } from './shared/routes/S2.routes';
import { v1Routes } from './shared/routes/v1.routes';

 
import { LoadingComponent } from './shared/loading/loading/loading.component';
import { rightsRoutes } from './features/rights/rights-master.route';
import { BookingBasisRoutes } from './module/master/booking-basicmst/bookingbasic.routes';
import { branchMstRoutes } from './module/master/common/branch-mst/branchmst.routes';
import { cityRoutes } from './module/master/common/city/city.routes';
import { companydivisionRoutes } from './module/master/common/companydivisionmst/companydivisionmst.routes';
import { CompanymstRoutes } from './module/master/common/companymst/companymst.routes';
import { countryRoutes } from './module/master/common/country/country.routes';
import { pincodemstRoutes } from './module/master/common/pincodemst/pincodemst.route';
import { stateRoutes } from './module/master/common/state/state-master.route';
import { CardRateRoutes } from './module/master/operation/card-ratemst/cardRate.route';
import { chargemstRoutes } from './module/master/operation/charges-mst/chagesmst.routes';
import { currencymasterRoutes } from './module/master/operation/currency-master/currencymasterRoutes';
import { customerRoutes } from './module/master/operation/customer/customer.routes';
import { materialmstRoutes } from './module/master/operation/material-master/materialmst.routes';
import { packingmstRoute } from './module/master/operation/packing-mst/packingmst.route';
import { payableRoutes } from './module/master/operation/payable/payable.routes';
import { RoutemstRoute } from './module/master/operation/routemst/routemst.routes';
import { ServiceModeRoutes } from './module/master/operation/service-modemst/servicemode.route';
import { vehicleCapacityRoutes } from './module/master/operation/vehicle-capacity-master/vehicleCapacityRoutes';
import { vehicleTrackingRoutes } from './module/master/operation/vehicletracking -mst/vehicletrackingmst.routes';
import { billSubmissionRoutes } from './module/transaction/Billing/bill-submission/bill-submission.routes';
import { mrChequeEntryRoutes } from './module/transaction/Billing/mr-cheque-entry/mr-cheque-entry.routes';
import { challanRoutes } from './module/transaction/operations/challan/challan.routes';
import { docketEntryRoutes } from './module/transaction/operations/docket-entry/docket-entry.routes';
import { DrsChallanCloseRoutes } from './module/transaction/operations/drs-challan-close/drschallanclose.routes';
import { drschallanRoute } from './module/transaction/operations/drs-challan/drschallanRoutes';
import { drsplanningsheetRoutes } from './module/transaction/operations/drsplanningsheet/drsplanningsheet.routes';
import { loadingSheetRoutes } from './module/transaction/operations/loading-sheet-create/loadingsheet.routes';
import { loadingsheetprintRoutes } from './module/transaction/operations/loading-sheet-print/loadingsheetprint.routes';
import { loadingsheetreportRoutes } from './module/transaction/operations/loadingsheet-status-and-report/loadingsheetstatusReport.routes';
import { NbcQrcodeRoute } from './module/transaction/operations/nbc-qrcode/npcqrcode.route';
import { NbcloadingsheetRoute } from './module/transaction/operations/nbcloadingsheetcreate/nbcloadingsheetcreate.route';
import { nbcunloadingsheetRoutes } from './module/transaction/operations/nbcunloadingsheet/nbcunloadingsheet.routes';
import { roadTcsRoutes } from './module/transaction/operations/road-tcs/road-tcs.routes';
import { stationaryRoutes } from './module/transaction/operations/stationary-allocation/stationaryRoutes';
import { StationaryRecieveComponent } from './module/transaction/operations/stationary-recieve/stationary-recieve.component';
import { tallysheetRoutes } from './module/transaction/operations/tallysheet-mst/tallysheetRoutes';
import { unloadingSheetRoute } from './module/transaction/operations/unloading-sheet/unloadingSheet.routes';
import { a1Routes } from './shared/routes/A1.routes';

export const routes: Routes = [
  // Public routes (without navbar)
  {
    path: '',
    component: HomeComponent,
    title: 'Welcome, TMS!',
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    children: [
      { path: 'login', loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent) },
      // Add other public routes here
    ]
  },
  {path:'loading',component:LoadingComponent},
  {
    path: 'dashboard',
    component: DashboardLayoutComponent, // Uses a separate layout
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      }
    ]
  },

  // Authenticated routes (with navbar)
  {
    path: '',
    component: AuthenticatedLayoutComponent,
    canActivate: [authGuard],
    children: [
      // Dashboard
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // All other authenticated routes grouped under the same layout
      { path: 'country-master', children: countryRoutes },
      { path: 'state-master', children: stateRoutes },
      { path: 'city-master', children: cityRoutes },
      // { path: 'vehicle-master', children: vehicleRoutes },
      { path: 'user-rights', children: rightsRoutes },
      { path: 'payable-master', children: payableRoutes },
      { path: 'customer-master', children: customerRoutes },
 
      { path: 'bookingbasicmst', children: BookingBasisRoutes },
      { path: 'cardratemst', children: CardRateRoutes },
      { path: 'branchmst', children: branchMstRoutes },
      { path: 'chargemst', children: chargemstRoutes },
      { path: 'serviceModemst', children: ServiceModeRoutes },
 
      { path: 'materialmst', children: materialmstRoutes },
      { path: 'pincodemst', children: pincodemstRoutes },
      { path: 'routemst', children: RoutemstRoute },
      // { path: 'marketvehicleRequest', children: marketvehicleRoutes },
      // { path: 'minidocket', children: minidocketRoutes },
      { path: 'tallysheet', children: tallysheetRoutes },
      { path: 'stationary-all', children: stationaryRoutes },
      { path: 'unloadingsheet', children: unloadingSheetRoute },
      { path: 'vehicletrackingmst', children: vehicleTrackingRoutes },
      { path: 'loadingsheet', children: loadingSheetRoutes },
      { path: 'packingmst', children: packingmstRoute },
      { path: 'companymst', children: CompanymstRoutes },
      { path: 'companydivisionmst', children: companydivisionRoutes },
      { path: 'loadingsheetprint', children: loadingsheetprintRoutes },
      { path: 'loadingsheetReport', children: loadingsheetreportRoutes },
      { path: 'drsplanningsheet', children: drsplanningsheetRoutes },
      { path: 'drschallan', children: drschallanRoute },
      { path: 'challan-entry', children: challanRoutes },
       { path: 'docket-entry', children: docketEntryRoutes },
      { path: 'road-tcs', children: roadTcsRoutes },
      { path: 'drschallanclose', children: DrsChallanCloseRoutes },
      { path: 'nbcloadingsheet', children: NbcloadingsheetRoute },
      { path: 'nbcunloadingsheet', children: nbcunloadingsheetRoutes },
      { path: 'nbcqrcode', children: NbcQrcodeRoute },
      { path: 'vehicle-master-capacity', children: vehicleCapacityRoutes },
      // { path: 'create-bill', children: billRoutes },
      { path: 'bill-submissions', children: billSubmissionRoutes },
      { path: 'mr-cheque-entries', children: mrChequeEntryRoutes },
       {path:'stationaryRecieve',component:StationaryRecieveComponent},
      //{ path: 'marketvehicleRequest', children:  marketvehiclerequestRoutes },
       {path:'CurrencyMaster',children:currencymasterRoutes},
      
     
      ...r1Routes,
      ...s1Routes,
      ...s2Routes,
      ...v1Routes,
      ...a1Routes,
    ]
  },
  // Wildcard route
  { path: '**', redirectTo: 'dashboard' }
];
