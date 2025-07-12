// city.routes.ts
import { Routes } from '@angular/router';
import { MiniDocketMstComponent } from './mini-docket-mst.component';
import { MiniDocketMstFormComponent } from './form/mini-docket-mst-form/mini-docket-mst-form.component';

export const minidocketRoutes: Routes = [
 

        {path:'',component:MiniDocketMstComponent,title:'minidocket'},
        {path:'new',component:MiniDocketMstFormComponent,title:'minidocket add'},
        {path:'view/:id',component:MiniDocketMstFormComponent,title:'minidocket view'},
        {path:'edit/:id',component:MiniDocketMstFormComponent,title:'minidocket edit'},
  
  
];
