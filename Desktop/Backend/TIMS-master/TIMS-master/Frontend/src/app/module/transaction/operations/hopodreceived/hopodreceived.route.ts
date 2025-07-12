import { Routes } from "@angular/router";
import { HopodreceivedComponent } from "./hopodreceived.component";
import { HopodreceivedFormComponent } from "./form/hopodreceived-form/hopodreceived-form.component";

export const HopodReceivedRoute:Routes=[
    {path:'',component:HopodreceivedComponent,title:'Hopod Received'},
    {path:'edit/:id',component:HopodreceivedFormComponent,title:'Hopod Update'},
    {path:'view/:id',component:HopodreceivedFormComponent,title:'Hopod view'},
]