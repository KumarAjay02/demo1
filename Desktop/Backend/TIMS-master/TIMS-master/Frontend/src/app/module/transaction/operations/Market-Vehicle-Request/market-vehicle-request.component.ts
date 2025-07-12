import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { MarketvehiclerequestservicesService } from './services/marketvehiclerequestservices.service';
import { marketvehiclerequestmodels } from './models/marketvehiclerequestmodels';

@Component({
  selector: 'app-market-vehicle-request',
  imports: [RouterLink, CommonModule, ReactiveFormsModule, MatTooltipModule],
  templateUrl: './market-vehicle-request.component.html',
  styleUrl: './market-vehicle-request.component.scss'
})
export class MarketVehicleRequestComponent {


   service = inject(MarketvehiclerequestservicesService);
  _router = inject(Router);
  branchList: marketvehiclerequestmodels[] = [];
  ngOnInit(): void {
    this.service.getBranchList().subscribe((data: marketvehiclerequestmodels[]) => {
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
