import { Routes } from "@angular/router";
import { PincodemstComponent } from "./pincodemst.component";
import { PincodemstFormComponent } from "./form/pincodemst-form/pincodemst-form.component";



export const pincodemstRoutes:Routes=[
    {path:'',component:PincodemstComponent},
    {path:'add',component:PincodemstFormComponent},
    {path:'view/:id',component:PincodemstFormComponent},
    {path:'edit/:id',component:PincodemstFormComponent}
]