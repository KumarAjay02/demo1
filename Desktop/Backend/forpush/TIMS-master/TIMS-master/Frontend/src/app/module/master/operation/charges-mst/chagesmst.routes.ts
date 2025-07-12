import { Routes } from "@angular/router";
import { ChargesMstComponent } from "./charges-mst.component";
import { ChargesMstFromComponent } from "./form/charges-mst-from/charges-mst-from.component";


export const chargemstRoutes:Routes=[
    {path:'',component:ChargesMstComponent,title:'Charge master'},
    {path:'add',component:ChargesMstFromComponent,title:' add'},
    {path:'view/:id',component:ChargesMstFromComponent,title:' view'},
    {path:'edit/:id',component:ChargesMstFromComponent,title:' view'},
]