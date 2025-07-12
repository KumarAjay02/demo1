import { Routes } from "@angular/router";
import { CompanydivisionmstComponent } from "./companydivisionmst.component";
import { CompanydivisionmstFormComponent } from "./companydivisionmst-form/companydivisionmst-form.component";

export const companydivisionRoutes:Routes=[
    {path:'',component:CompanydivisionmstComponent,title:'Company Division'},
    {path:'add',component:CompanydivisionmstFormComponent,title:'Create Company Division'},
    {path:'view/:id',component:CompanydivisionmstFormComponent},
    {path:'edit/:id',component:CompanydivisionmstFormComponent},
]