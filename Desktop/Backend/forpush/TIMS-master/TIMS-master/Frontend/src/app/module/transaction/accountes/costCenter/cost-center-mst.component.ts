import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { costCenterModel } from './model/costCenterModel';
import { CostCenterMstServiceService } from './service/cost-center-mst-service.service';
@Component({
  selector: 'app-cost-center-mst',
  imports: [CommonModule,RouterLink,MatTooltipModule],
  templateUrl: './cost-center-mst.component.html',
  styleUrl: './cost-center-mst.component.scss'
})
export class CostCenterMstComponent {
   _router=inject(Router);
  _service=inject(CostCenterMstServiceService);
  costCenterMst:costCenterModel[]=[];
  ngOnInit(): void {
    this._service.getAllCostCenter().subscribe(e=>{
        this.costCenterMst=e;
    })
  }
  BtnView(id:any){
    this._router.navigateByUrl('CostCenterMaster/view/'+id);
  }
  BtnUpdate(id:any){
    this._router.navigateByUrl('/CostCenterMaster/edit/'+id);
  }
}
