import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { MinidocketmstService } from '../mini-docket/services/minidocketmst.service';
import { minidocketmaster } from '../mini-docket/models/minidocketmaster';
import { StationarymstService } from './services/stationarymst.service';
import { stationaryallocationmaster } from './models/stationaryallocationmaster';

@Component({
  selector: 'app-stationary-allocation-mst',
  imports: [RouterLink,CommonModule,ReactiveFormsModule ,MatTooltipModule],
  templateUrl: './stationary-allocation-mst.component.html',
  styleUrl: './stationary-allocation-mst.component.css'
})
export class StationaryAllocationMstComponent {


       _service=inject(StationarymstService);
          _router=inject(Router);
      
        branchList:stationaryallocationmaster[]=[];
      
      
        ngOnInit(): void {
          this._service.getBranchList().subscribe(data=>{
            this.branchList=data;
          })
      
          
        }
      
        BtnView(id:any){
      
          this._router.navigateByUrl('stationary-all/view/'+id);
        }
      
      
        BtnUpdate(id:any){
          this._router.navigateByUrl('stationary-all/edit/'+id);
        }




}
