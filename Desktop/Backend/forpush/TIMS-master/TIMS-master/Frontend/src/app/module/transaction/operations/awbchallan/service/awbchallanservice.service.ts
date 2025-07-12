import { Injectable } from '@angular/core';
import { AwbChallanModels } from '../models/awbchallanModel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwbchallanserviceService {

  constructor() { }




  awbData=new BehaviorSubject<AwbChallanModels[]>([
 {AwbNo:'16519893',AwbDate:'06jun2025',FlightNo:"6E6721",
  FlightName:'INDIGO',DepartureTime:'8:10',BrokerName:'S.B.LOG',}
  ])

  getAwbData(){
    return this.awbData.asObservable();
  }
}
