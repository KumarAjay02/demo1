import { Routes } from "@angular/router";
import { CustomerRateListComponent } from "./customer-rate-list.component";
import { CustomerRateMasterComponent } from "./customer-rate.component";

export const customerrateroute:Routes=[
    { path:'',component:CustomerRateListComponent},
    {path:'New', component:CustomerRateMasterComponent}
]