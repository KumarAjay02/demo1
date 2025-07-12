import { Routes } from '@angular/router';
import { MarketVehicleRequestComponent } from './market-vehicle-request.component';
import { MarketVehicleRequestFormComponent } from './form/market-vehicle-request-form.component';
export const marketvehiclerequestRoutes: Routes = [
     {path:'',component:MarketVehicleRequestComponent,title:' marketvehicleRequest'},
      {path:'add',component:MarketVehicleRequestFormComponent,title:'marketvehicleRequest Form'},
      {path:'view/:id',component:MarketVehicleRequestFormComponent,title:'view'},
      {path:'edit/:id',component:MarketVehicleRequestFormComponent,title:'edit'},
];
