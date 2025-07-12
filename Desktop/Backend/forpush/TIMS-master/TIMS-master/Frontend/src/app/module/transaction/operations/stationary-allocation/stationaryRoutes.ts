// city.routes.ts
import { Routes } from '@angular/router';
import { StationaryAllocationMstFormComponent } from './form/stationary-allocation-mst-form.component';
import { StationaryAllocationMstComponent } from './stationary-allocation-mst.component';

export const stationaryRoutes: Routes = [

      {path:'',component:StationaryAllocationMstComponent,title:'Stationary'},
      {path:'new',component:StationaryAllocationMstFormComponent,title:'Stationary add'},
      {path:'view/:id',component:StationaryAllocationMstFormComponent,title:'Stationary view'},
      {path:'edit/:id',component:StationaryAllocationMstFormComponent,title:'Stationary edit'},


];
