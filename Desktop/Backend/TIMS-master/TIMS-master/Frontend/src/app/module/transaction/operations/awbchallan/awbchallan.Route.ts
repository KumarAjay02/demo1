import { Routes } from "@angular/router";
import { AwbchallanComponent } from "./awbchallan.component";
import { AwbchallanformComponent } from "./form/awbchallanform/awbchallanform.component";

export const AwbChallanRoutes:Routes=[
    {path:'',component:AwbchallanComponent,title:'Awb Challan'},
    {path:'add',component:AwbchallanformComponent,},
    {path:'view/:id',component:AwbchallanformComponent,},
    {path:'edit/:id',component:AwbchallanformComponent,}
]