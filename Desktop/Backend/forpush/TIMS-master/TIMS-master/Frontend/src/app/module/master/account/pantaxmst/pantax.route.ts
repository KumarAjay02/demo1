import { Routes } from "@angular/router";
import { PantaxmstComponent } from "./pantaxmst.component";
import { PantaxmstFormComponent } from "./form/pantaxmst-form/pantaxmst-form.component";
import { PantaxmstformComponent } from "./form/pantaxmstform/pantaxmstform.component";

export const PantaxRoute:Routes=[
    {path:'',component:PantaxmstComponent},
    {path:'add',component:PantaxmstFormComponent},
    {path:'view/:id',component:PantaxmstFormComponent},
    {path:'edit/:id',component:PantaxmstFormComponent},
    {path:'add-tax',component:PantaxmstformComponent},
    {path:'view-tax/:id',component:PantaxmstformComponent},
    {path:'edit-tax/:id',component:PantaxmstformComponent}
]