import { Routes } from "@angular/router";
import { BranchMstComponent } from "./branch-mst.component";
import { BranchmstFormComponent } from "./form/branchmst-form/branchmst-form.component";

export const branchMstRoutes:Routes=[
    {path:'',component:BranchMstComponent,title:'branch Master'},
    {path:'add',component:BranchmstFormComponent,title:'Create branch'},
    {path:'view/:id',component:BranchmstFormComponent,title:'branch view'},
    {path:'edit/:id',component:BranchmstFormComponent,title:'branch edit'},
]