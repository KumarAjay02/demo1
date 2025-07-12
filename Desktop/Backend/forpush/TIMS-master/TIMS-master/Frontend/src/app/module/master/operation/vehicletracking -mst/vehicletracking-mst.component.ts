
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { vehicletrackingmaster } from './models/vehicletrackingmaster';
import { VehicletrackingmstService } from './services/vehicletrackingmst.service';

@Component({
  selector: 'app-vehicletracking-mst',
  imports: [RouterLink,CommonModule,ReactiveFormsModule ,MatTooltipModule],
  templateUrl: './vehicletracking-mst.component.html',
  styleUrl: './vehicletracking-mst.component.css'
})
export class VehicletrackingMstComponent {  
         _service=inject(VehicletrackingmstService);
            _router=inject(Router);
        
          branchList:vehicletrackingmaster[]=[];
        
        
          ngOnInit(): void {
            this._service.getBranchList().subscribe(data=>{
              this.branchList=data;
            })
        
            
          }
        
          BtnView(id:any){
        
            this._router.navigateByUrl('vehicletrackingmst/view/'+id);
          }
        
        
          BtnUpdate(id:any){
            this._router.navigateByUrl('vehicletrackingmst/edit/'+id);
          }
  
  

}
