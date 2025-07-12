import { Routes } from "@angular/router";
import { VehicletrackingMstComponent } from "./vehicletracking-mst.component";
import { VehicletrakingMstFormComponent } from "./form/vehicletraking-mst-form.component";
 


export const vehicleTrackingRoutes:Routes=[
    {path:'',component:VehicletrackingMstComponent,title:'Vehicle tracking'},
    {path:'add',component:VehicletrakingMstFormComponent},
    {path:'view/:id',component:VehicletrakingMstFormComponent},
    {path:'edit/:id',component:VehicletrakingMstFormComponent}
]