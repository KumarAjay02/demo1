import { Injectable } from '@angular/core';
import { stationaryrecieve } from '../models/stationaryrecieve';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationaryRecieveServicesService {
  constructor() { }
    datalist = new BehaviorSubject<stationaryrecieve[]>([
      {
        "ReferenceNo": "10100",
        "ToLocation": "GGN",
        "FromSeries": "001",
        "ToSeries": "010",
        "Type": "DOCKET",
        "Quantity":"50",
      },
       {
        "ReferenceNo": "10200",
        "ToLocation": "CKN",
        "FromSeries": "002",
        "ToSeries": "020",
        "Type": "DOCKET",
        "Quantity":"200",
      },
       {
        "ReferenceNo": "10300",
        "ToLocation": "CKN",
        "FromSeries": "003",
        "ToSeries": "030",
        "Type": "DOCKET",
        "Quantity":"300",
      },
    ])
  
    getStationryRecList() {
  
      return this.datalist.asObservable()
    }
}
