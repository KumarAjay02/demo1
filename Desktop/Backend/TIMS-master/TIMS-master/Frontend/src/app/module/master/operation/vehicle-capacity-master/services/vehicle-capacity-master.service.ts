import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {vehiclecapacitymaster} from '../models/vehiclecapacitymaster';

@Injectable({
  providedIn: 'root'
})
export class VehicleCapacityMasterService {
  datalist = new BehaviorSubject<vehiclecapacitymaster[]>([

    {
      "vehiclesize": "14FT",
      "capacity": "100KG",
      "IsActive": "YES",
    },
    {
      "vehiclesize": "20FT",
      "capacity": "500KG",
      "IsActive": "NO",
    }

  ])

  getBranchList() {

    return this.datalist.asObservable()

  }


}
