import { Routes } from "@angular/router";
import { VendorvehicleratemstComponent } from "./vendorvehicleratemst.component";
import { VendorvehicleratemstFormComponent } from "./form/vendorvehicleratemst-form/vendorvehicleratemst-form.component";
 

export const VendorvehicleratemstRoutes:Routes=[
    {path:'',component:VendorvehicleratemstComponent,title:'Vendor Vehicle rate'},
    {path:'add',component:VendorvehicleratemstFormComponent,title:'Create Vendor Vehicle Rate'},
    {path:'view/:id',component:VendorvehicleratemstFormComponent,title:'VIEW'},
    {path:'edit/:id',component:VendorvehicleratemstFormComponent,title:'edit'},
]