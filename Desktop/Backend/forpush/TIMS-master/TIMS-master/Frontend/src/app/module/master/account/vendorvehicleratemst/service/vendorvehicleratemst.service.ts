import { Injectable } from '@angular/core';
import { VendorVehicleRateModel } from '../model/vendorvehicleratemodel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorvehicleratemstService {


  vendorratelist=new BehaviorSubject<VendorVehicleRateModel[]>([
    {vehicleNo:'MH15HT5528',RouteType:'LONG',Rate:700,RouteId:'2012',},
    {vehicleNo:'MH16HP5020',RouteType:'LOCAL',Rate:1200,RouteId:'1220',},
  ]);


  getlistrate(){
    return this.vendorratelist.asObservable();
  }

}
