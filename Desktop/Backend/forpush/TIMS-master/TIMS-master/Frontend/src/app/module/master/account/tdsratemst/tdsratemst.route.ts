import { Routes } from "@angular/router";
import { TdsratemstComponent } from "./tdsratemst.component";
import { TdsratemstFormComponent } from "./form/tdsratemst-form/tdsratemst-form.component";

export const TdsratemstRoutes:Routes=[
    {path:'',component:TdsratemstComponent,title:'Tds Rate'},
    {path:'add',component:TdsratemstFormComponent,title:'Tds Rate'},
    {path:'view/:id',component:TdsratemstFormComponent},
    {path:'edit/:id',component:TdsratemstFormComponent},
]