import { Routes } from "@angular/router";
import { FinancialyearopeningComponent } from "./financialyearopening.component";
import { FinancialyearopeninglistComponent } from "./list/financialyearopeninglist/financialyearopeninglist.component";

export const FinancialYearOpeningRoute:Routes=[
    {path:'',component:FinancialyearopeninglistComponent,title:'Financial Year'},
    {path:'add',component:FinancialyearopeningComponent,title:'Financial Year'},
    {path:'view/:id',component:FinancialyearopeningComponent},
    {path:'edit/:id',component:FinancialyearopeningComponent},
]