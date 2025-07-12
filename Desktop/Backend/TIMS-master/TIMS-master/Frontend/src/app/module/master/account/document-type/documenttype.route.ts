import { Routes } from "@angular/router";
import { DocumentTypeComponent } from "./document-type.component";
import { DocumenttypeformComponent } from "./form/documenttypeform/documenttypeform.component";

export const DocumentTypeRoute:Routes=[
    {path:'',component:DocumentTypeComponent},
    {path:'add',component:DocumenttypeformComponent},
    {path:'view/:id',component:DocumenttypeformComponent},
    {path:'edit/:id',component:DocumenttypeformComponent},
]