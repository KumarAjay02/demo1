import { Routes } from "@angular/router";
import { EinvoiceComponent } from "./einvoice.component";


export const einvoiceRoute:Routes=[
    { path:'',component:EinvoiceComponent,title:'E-invoice'},
    {path:'New', component:EinvoiceComponent}
]