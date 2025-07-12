import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { VehiclemstService } from '../services/vehiclemst.service';
import { BranchMaster } from '../../branch-mst/models/branchmst';
import { vehicleMaster } from '../models/vehiclemst';
// import { BranchMaster } from '../../branch-mst/models/branchmst';
// import { BranchMaster } from '../masters/branch-mst/models/branchmst';
// import { BranchmstService } from '../masters/branch-mst/services/branchmst.service';

@Component({
  selector: 'app-vehicle-master',
  imports: [RouterLink,CommonModule,ReactiveFormsModule ,MatTooltipModule],
  templateUrl: './vehicle-master.component.html',
  styleUrl: './vehicle-master.component.css'
})
export class VehicleMasterComponent {


   _service=inject(VehiclemstService);
      _router=inject(Router);
  
    branchList:vehicleMaster[]=[];
  
  
    ngOnInit(): void {
      this._service.getBranchList().subscribe(data=>{
        this.branchList=data;
      })
  
      
    }
  
    BtnView(id:any){
  
      this._router.navigateByUrl('branchmst/view/'+id);
    }
  
  
    BtnUpdate(id:any){
      this._router.navigateByUrl('branchmst/edit/'+id);
    }

  
}
