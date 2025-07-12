
import { Routes } from '@angular/router';
import { VehicleCapacityMasterComponent } from './vehicle-capacity-master.component';
import { VehicleCapacityMasterFormComponent } from './form/vehicle-capacity-master-form.component';

export const vehicleCapacityRoutes: Routes = [
          {path:'',component:VehicleCapacityMasterComponent,title:'Create vehiclecapacity'},
          {path:'new',component:VehicleCapacityMasterFormComponent,title:' vehiclecapacity add'},
          {path:'view/:id',component:VehicleCapacityMasterFormComponent,title:'vehiclecapacity view'},
          {path:'edit/:id',component:VehicleCapacityMasterFormComponent,title:'vehiclecapacity edit'},
    
];
