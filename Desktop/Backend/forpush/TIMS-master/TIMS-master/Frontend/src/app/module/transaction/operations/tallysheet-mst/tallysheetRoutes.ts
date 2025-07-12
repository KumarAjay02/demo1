// city.routes.ts
import { Routes } from '@angular/router';
import { TallysheetMstComponent } from './tallysheet-mst.component';
import { TallysheetMstFormComponent } from './form/tallysheet-mst-form.component';

export const tallysheetRoutes: Routes = [
          {path:'',component:TallysheetMstComponent,title:'tallysheet'},
          {path:'new',component:TallysheetMstFormComponent,title:'tallysheet add'},
          {path:'view/:id',component:TallysheetMstFormComponent,title:'tallysheet view'},
          {path:'edit/:id',component:TallysheetMstFormComponent,title:'tallysheet edit'},
];
