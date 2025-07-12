import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { vehiclecapacitymaster } from './models/vehiclecapacitymaster';
import { VehicleCapacityMasterService } from './services/vehicle-capacity-master.service';

@Component({
  selector: 'app-vehicle-capacity-master',
  imports: [RouterLink, CommonModule, ReactiveFormsModule, MatTooltipModule],
  templateUrl: './vehicle-capacity-master.component.html',
  styleUrl: './vehicle-capacity-master.component.scss'
})
export class VehicleCapacityMasterComponent {

  service = inject(VehicleCapacityMasterService);
  _router = inject(Router);
  branchList: vehiclecapacitymaster[] = [];
  ngOnInit(): void {
    this.service.getBranchList().subscribe((data: vehiclecapacitymaster[]) => {
      this.branchList = data;
    })
  }
  BtnView(id: any) {

    this._router.navigateByUrl('vehicle-master-capacity/view/'+ id);
  }

  BtnUpdate(id: any) {
    this._router.navigateByUrl('vehicle-master-capacity/edit/' + id);
  }

}
