import { Routes } from "@angular/router";
import { CostCenterMstFormComponent } from "./form/cost-center-mst-form/cost-center-mst-form.component";
import { CostCenterMstComponent } from "./cost-center-mst.component";

export const costCenterRoutes:Routes=[
    {path:'',component:CostCenterMstComponent,title:' cost Center'},
    {path:'add',component:CostCenterMstFormComponent,title:'currency Master Form'},
    {path:'view/:id',component:CostCenterMstFormComponent,title:'view'},
    {path:'edit/:id',component:CostCenterMstFormComponent,title:'edit'},    

]