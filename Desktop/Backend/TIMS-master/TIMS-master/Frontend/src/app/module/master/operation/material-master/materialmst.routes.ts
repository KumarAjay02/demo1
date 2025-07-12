import { Routes } from "@angular/router";
import { MaterialMasterComponent } from "./material-master.component";
import { MaterialMasterFormComponent } from "./material-master-form/material-master-form.component";
export const materialmstRoutes:Routes=[
    {path:'',component:MaterialMasterComponent},
    {path:'add',component:MaterialMasterFormComponent},
    {path:'view/:id',component:MaterialMasterFormComponent},
    {path:'edit/:id',component:MaterialMasterFormComponent},
]