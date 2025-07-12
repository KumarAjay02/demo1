import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
 
import { MarketvehicleapprovalservicesService } from './services/marketvehicleapprovalservices.service';
import { marketvehicleapprovalmodel } from './models/marketvehicleapprovalmodel';

@Component({
  selector: 'app-market-vehicle-approval',
  imports: [RouterLink, CommonModule, ReactiveFormsModule, MatTooltipModule],
  templateUrl: './market-vehicle-approval.component.html',
  styleUrl: './market-vehicle-approval.component.scss'
})
export class MarketVehicleApprovalComponent {


  
  service = inject(MarketvehicleapprovalservicesService );
  _router = inject(Router);
  branchList: marketvehicleapprovalmodel[] = [];
  ngOnInit(): void {
    this.service.getBranchList().subscribe((data: marketvehicleapprovalmodel[]) => {
      this.branchList = data;
    })
    
  }
  BtnView(id: any) {

    this._router.navigateByUrl('//' + id);
  }

  BtnUpdate(id: any) {
    this._router.navigateByUrl('//' + id);
  }



}
