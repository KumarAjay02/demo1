import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { vehicletrackingmaster } from '../models/vehicletrackingmaster';

@Injectable({
  providedIn: 'root'
})
export class VehicletrackingmstService {

    datalist = new BehaviorSubject<vehicletrackingmaster[]>([
      {
        "TrackingId": "DWB10100",
        "VehicleNo": "DL-01-C-1234",
        "VehicleType": "Mini",
        "FromBranch": "Mumbai",
        "ToBranch": "Delhi"
      },
      {
        "TrackingId": "DWB0100",
        "VehicleNo": "DL-01-C-4321",
        "VehicleType": "Container ",
        "FromBranch": "Mumbai",
        "ToBranch": "Delhi"
      }







    ])

    getBranchList() {

      return this.datalist.asObservable()

    }

}
