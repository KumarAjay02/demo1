import { Routes } from "@angular/router";
import { NbcloadingsheetcreateComponent } from "./nbcloadingsheetcreate.component";
import { NbcloadingsheetcreatelistComponent } from "./nbcloadingsheetcreatelist/nbcloadingsheetcreatelist.component";

export const NbcloadingsheetRoute:Routes=[
    {path:'',component:NbcloadingsheetcreatelistComponent,title:'Nbc loadingsheet '},
    {path:'new',component:NbcloadingsheetcreateComponent,title:'Create nbc loading sheet'},
    {path:'view/:id',component:NbcloadingsheetcreateComponent,title:'view nbc loading sheet'},
    {path:'edit/:id',component:NbcloadingsheetcreateComponent,title:'edit nbc loading sheet'}
]