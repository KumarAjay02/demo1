import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { marketvehicleapprovalmodel } from '../models/marketvehicleapprovalmodel';
import { marketvehicleapprovalmodeladd } from '../models/marketvehicleapprovalmodeladd';

@Injectable({
  providedIn: 'root'
})
export class MarketvehicleapprovalservicesService {

   private datalist=new BehaviorSubject<marketvehicleapprovalmodel[]>([
       {

         RequestNo: '09',
         RequestDate: '2025-05-07 ',
         FromBranch: 'Uttar Pradesh',
         ToBranch: 'Pune',
         RequirementType: 'Temporary ',
       },
       {

         RequestNo: '12',
         RequestDate: '2025-05-10',
         FromBranch: 'Tamil Nadu',
         ToBranch: 'Uttar Pradesh',
         RequirementType: 'Short-Term'
       }



     ])


    getBranchList(){

          return this.datalist.asObservable()

        }
        private adddatalist=new BehaviorSubject<marketvehicleapprovalmodeladd[]>([
       {

         BrokerCode: '9',
         RequestDate: '2025-05-07 ',
         BrokerName: 'Dev Kumar',
         BrokerNo:'011',
         BrokerRate: '5 ',
       },
       {
    "BrokerCode": "10",
    "RequestDate": "2025-05-10",
    "BrokerName": "Anita Sharma",
    "BrokerNo": "012",
    "BrokerRate": "4.5"
  },
  {
    "BrokerCode": "11",
    "RequestDate": "2025-05-11",
    "BrokerName": "Rahul Mehta",
    "BrokerNo": "013",
    "BrokerRate": "5.0"
  },




     ])


    getBranchListadd(){

          return this.adddatalist.asObservable()

        }
        getmstaddById(id:any){
        }



}
