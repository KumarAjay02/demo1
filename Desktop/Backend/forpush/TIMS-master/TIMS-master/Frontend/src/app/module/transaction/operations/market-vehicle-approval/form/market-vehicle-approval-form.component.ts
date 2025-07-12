import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MarketvehicleapprovalservicesService } from '../services/marketvehicleapprovalservices.service';
import { marketvehicleapprovalmodel } from '../models/marketvehicleapprovalmodel';
import { marketvehicleapprovalmodeladd } from '../models/marketvehicleapprovalmodeladd';
@Component({
  selector: 'app-market-vehicle-approval-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, FormsModule],
  templateUrl: './market-vehicle-approval-form.component.html',
  styleUrl: './market-vehicle-approval-form.component.scss'
})
export class MarketVehicleApprovalFormComponent {
  service = inject(MarketvehicleapprovalservicesService);
  _router = inject(Router);
  branchList: marketvehicleapprovalmodel[] = [];
  
 addbranchList: marketvehicleapprovalmodeladd[] = [];
  ngOnInit(): void {
    this.service.getBranchList().subscribe((data: marketvehicleapprovalmodel[]) => {
      this.branchList = data;
       this.service.getBranchListadd().subscribe((data: marketvehicleapprovalmodeladd[]) => {
      this.addbranchList = data;
    })
    })
  }

  BtnView(id: any) {

    this._router.navigateByUrl('//' + id);
  }

  BtnUpdate(id: any) {
    this._router.navigateByUrl('//' + id);
  }
}
