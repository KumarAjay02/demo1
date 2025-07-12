import { Routes } from "@angular/router";
import { CompanymstComponent } from "./companymst.component";
import { CompanymstFormComponent } from "./form/companymst-form/companymst-form.component";

export const CompanymstRoutes:Routes=[
    {path:'',component:CompanymstComponent,title:'Company Master'},
    {path:'add',component:CompanymstFormComponent,title:'Create Company'},
    {path:'view/:id',component:CompanymstFormComponent},
    {path:'edit/:id',component:CompanymstFormComponent},
]