import { Routes } from "@angular/router";
import { ServiceModemstComponent } from "./service-modemst.component";
import { ServicemodemstFormComponent } from "./form/servicemodemst-form/servicemodemst-form.component";


export const ServiceModeRoutes:Routes=[
    {path:'',component:ServiceModemstComponent,title:' Service Mode'},
    {path:'add',component:ServicemodemstFormComponent,title:'Service Mode Form'},
    {path:'view/:id',component:ServicemodemstFormComponent,title:'view'},
    {path:'edit/:id',component:ServicemodemstFormComponent,title:'edit'},
]