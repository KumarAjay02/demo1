import { Routes } from "@angular/router";
import { PackingMstComponent } from "./packing-mst.component";
import { PackingmstFormComponent } from "./form/packingmst-form/packingmst-form.component";


export const packingmstRoute:Routes=[
    {path:'',component:PackingMstComponent},
    {path:'add',component:PackingmstFormComponent},
    {path:'view/:code',component:PackingmstFormComponent},
    {path:'edit/:code',component:PackingmstFormComponent},
]