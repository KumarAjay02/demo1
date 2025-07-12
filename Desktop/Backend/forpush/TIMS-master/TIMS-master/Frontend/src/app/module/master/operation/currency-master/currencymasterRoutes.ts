import { Routes } from "@angular/router";
import { CurrencyMstComponent } from "./currency-mst.component";
import { CurrencyMstFormComponent } from "./form/currency-mst-form.component";

export const currencymasterRoutes:Routes=[
    {path:'',component:CurrencyMstComponent,title:' currency Master'},
    {path:'add',component:CurrencyMstFormComponent,title:'currency Master Form'},
    {path:'view/:id',component:CurrencyMstFormComponent,title:'view'},
    {path:'edit/:id',component:CurrencyMstFormComponent,title:'edit'},


    

]