import { Routes } from "@angular/router";
import { RoutemstComponent } from "./routemst.component";
import { RoutemstFormComponent } from "./form/routemst-form/routemst-form.component";

export const RoutemstRoute:Routes=[
    {path:'',component:RoutemstComponent},
    {path:'add',component:RoutemstFormComponent},
    {path:'view/:id',component:RoutemstFormComponent},
    {path:'edit/:id',component:RoutemstFormComponent},

]