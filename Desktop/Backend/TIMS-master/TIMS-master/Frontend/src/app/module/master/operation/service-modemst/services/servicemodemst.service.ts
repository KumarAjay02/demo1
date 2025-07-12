import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ServiceModeMaster } from '../models/serviceMode.model';

@Injectable({
  providedIn: 'root'
})
export class ServicemodemstService {




  datalist=new BehaviorSubject<ServiceModeMaster[]>([

  {
    CompanyCode:'G2AR',SerialNo:2536544212,Code:'AD15',ProductName:'JK',ServiceMode:'ROAD',Sac:'NO'
    ,GstRate:18,Status:'ACTIVE'
  },
  {
    CompanyCode:'HJ45',SerialNo:36524,Code:'DF1',ProductName:'HR',ServiceMode:'AIR',Sac:'NO'
    ,GstRate:18,Status:'ACTIVE'
  }
])


getAllServiceMode(){

  return this.datalist.asObservable();
}

}

