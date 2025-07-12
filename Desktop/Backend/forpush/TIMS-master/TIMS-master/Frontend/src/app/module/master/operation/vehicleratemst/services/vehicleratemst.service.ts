import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VehicleRateMaster } from '../models/vehicleratemst.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleratemstService {

  vehicleRatemst=new BehaviorSubject<VehicleRateMaster[]>([
    {VehicleNo:'HR07AD5525',BranchCode:'AMD',RateMonthly:25000,RouteStatus:'LOCAL',UpStn:'AMD',ToStn:'DHRT'},
    {VehicleNo:'HR07AD5220',BranchCode:'NDA',RateMonthly:25000,RouteStatus:'LOCAL',UpStn:'NDA',ToStn:'GGC'}
  ])


  getVehicleList(){
    return this.vehicleRatemst.asObservable();
  }
}
