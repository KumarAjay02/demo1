import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tallysheet } from '../models/tallysheet';

@Injectable({
  providedIn: 'root'
})
export class TallysheetService {

  datalist= new BehaviorSubject<tallysheet[]>([

    {
      "LoadingSheetNo": "03",
      "Route": "Via Noida",
      "VehicleNo": "UP 16 CD 5678",
      "VehicleType": "Container Truck",
      "VehicleSize": "20Ft"
    },
    {
      "LoadingSheetNo": "02",
      "Route": "Via Gurugram",
      "VehicleNo": "HR 26 AB 1234",
      "VehicleType": "Mini Truck",
      "VehicleSize": "8Ft"
    }
  ])

  getBranchList(){

    return this.datalist.asObservable()
  }
}
