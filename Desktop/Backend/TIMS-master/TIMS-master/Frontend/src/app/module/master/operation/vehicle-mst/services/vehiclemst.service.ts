import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BranchMaster } from '../../branch-mst/models/branchmst';
import { vehicleMaster } from '../models/vehiclemst';

@Injectable({
  providedIn: 'root'
})
export class VehiclemstService {

  // CO CODE	VEHICLE NO	OWNER NAME	CHASIS NO	OWNER ADDRESS	ENGINE NO	INSURANCE START	INSURANCE EXPIRY	STATUS

  // InsuranceStart?:string;
  // InsuranceExpiry?:string;

  datalist= new BehaviorSubject<vehicleMaster[]>([
    { CoCode:'SUNTEK AXPRESS',VehicleNo:'0526',OwnerName:'Amit ji',OwnerAddress:'New Delhi G/10'
      ,ChasisNo:'1HGCM82',EngineNo:'PJ12345U123456P',InsuranceStart:'14Mar2024',InsuranceExpiry:'13Mar2025',VehicleModel:'1023',VehicleYear:'20/05/2025',
      ActualCapacity:'100Kg',CarringCap:'200kg',
      Status:'active'
    },
    {
      CoCode: 'FAST TRACK LOGISTICS',
      VehicleNo: '7834',
      OwnerName: 'Rajesh Kumar',
      OwnerAddress: 'Mumbai B/12',
      ChasisNo: '2HGFA16',
      EngineNo: 'QW98765X432109Z',
      InsuranceStart: '01Apr2024',
      InsuranceExpiry: '31Mar2025',
      VehicleModel: '2045',
      VehicleYear: '15/07/2024',
      ActualCapacity: '150Kg',
      CarringCap: '300kg',
      Status: 'active'
    }


  ])

  getBranchList(){

    return this.datalist.asObservable()

  }


}
