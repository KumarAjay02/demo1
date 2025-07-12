import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { costCenterModel } from '../model/costCenterModel';
@Injectable({
  providedIn: 'root'
})
export class CostCenterMstServiceService {
      datalist=new BehaviorSubject<costCenterModel[]>([
      {
        costCenterId:"001",costCenterDesc:'ACCOUNTS',status:'Yes',
      },
      {
        costCenterId:"002",costCenterDesc:'ADMINISTRATION',status:'ON',
      },
        {
        costCenterId:"003",costCenterDesc:'BILLING',status:'YES',
      },
    ])
    getAllCostCenter(){
      return this.datalist.asObservable();
    }
}
