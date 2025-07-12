import { Routes } from "@angular/router";
import { GstratemstComponent } from "./gstratemst.component";
import { GstratemstformComponent } from "./form/gstratemstform/gstratemstform.component";

export const GstratemstRoute:Routes=[
    {path:'',component:GstratemstComponent,title:'Gst Rate'},
    {path:'add',component:GstratemstformComponent,title:'Gst Rate'},
    {path:'view/:id',component:GstratemstformComponent},
    {path:'edit/:id',component:GstratemstformComponent}
]