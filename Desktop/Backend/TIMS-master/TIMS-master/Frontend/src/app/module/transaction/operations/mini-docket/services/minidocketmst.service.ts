import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';
import {minidocketmaster} from '../models/minidocketmaster';

@Injectable({
  providedIn: 'root'
})
export class MinidocketmstService {

  datalist = new BehaviorSubject<minidocketmaster[]>([
    {
      "DWBNO": "DWB10046",
      "DocketDate": "2025-05-04",
      "BookingMode": "Surface",
      "DeliveryBranch": "Chennai",
      "BookingBasis": "To Pay",
      "Branch": "Bangalore",
      "TotalPkg": "5"
    },
    {
      "DWBNO": "DWB10045",
      "DocketDate": "2025-05-01",
      "BookingMode": "Air",
      "DeliveryBranch": "Mumbai",
      "BookingBasis": "Prepaid",
      "Branch": "Delhi",
      "TotalPkg": "10"
    }

  ])

  getBranchList() {

    return this.datalist.asObservable()

  }
}
