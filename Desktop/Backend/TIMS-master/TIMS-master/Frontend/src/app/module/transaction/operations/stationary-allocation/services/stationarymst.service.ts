import { Injectable } from '@angular/core';
import { minidocketmaster } from '../../mini-docket/models/minidocketmaster';
import { BehaviorSubject } from 'rxjs';
import { stationaryallocationmaster } from '../models/stationaryallocationmaster';

@Injectable({
  providedIn: 'root'
})
export class StationarymstService {

  datalist = new BehaviorSubject<stationaryallocationmaster[]>([
    {
      "ReferenceNo": "DWB10100",
      "Type": "Docket",
      "FormLocation": "Delhi",
      "ToLocation": "Mumbai",
      "status": "yes"
    },
    {
      "ReferenceNo": "DWB10046",
      "Type": "Docket",
      "FormLocation": "Surface",
      "ToLocation": "Chennai",
      "status": "No"
    }




  ])

  getBranchList() {

    return this.datalist.asObservable()

  }
}
