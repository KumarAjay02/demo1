import { Routes } from "@angular/router";
import { LoadingSheetCreateComponent } from "./loading-sheet-create.component";
import { LoadingsheetcreatelistComponent } from "./loadingsheetcreatelist/loadingsheetcreatelist.component";
 


export const loadingSheetRoutes:Routes=[
    {path:'',component:LoadingsheetcreatelistComponent,title:'LoadingSheet'},
    {path:'new',component:LoadingSheetCreateComponent,title:'Create Loadingsheet'},
    {path:'view/:id',component:LoadingSheetCreateComponent,title:'view Loadingsheet'},
    {path:'edit/:id',component:LoadingSheetCreateComponent,title:'edit Loadingsheet'},
    {path:'print/:id',component:LoadingSheetCreateComponent,title:'print Loadingsheet'},
    
]