import { Routes } from "@angular/router";
import { CardRatemstComponent } from "./card-ratemst.component";
import { CardrateFormComponent } from "./form/cardrate-form/cardrate-form.component";


export const CardRateRoutes:Routes=[
    {path:'',component:CardRatemstComponent,title:'Card Rate'},
    {path:'add',component:CardrateFormComponent,title:'Card Rateb'},
    {path:'view/:id',component:CardrateFormComponent,title:'Card Rate view'},
    {path:'edit/:id',component:CardrateFormComponent,title:'Card Rate edit'}
]