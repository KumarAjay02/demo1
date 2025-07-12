import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HoPodReceive } from '../models/hopodreceived.Model';

@Injectable({
  providedIn: 'root'
})
export class HopodreceivedserviceService {

  constructor() { }




  hopodlist=new BehaviorSubject<HoPodReceive[]>([
    {DocketNo:'11681169',RefrenceNo:'10151418',Type:'pod',BookingDate:'09may2025',DispatchBranch:'tpl',DispatchTo:'ggco',
      BookingBasis:'mhl',Consignee:'ARGL LIMITED',Consignor:'SWARAJ ENGINES LTD',BillingParty:'ARGL LIMITED',Remark:''
    }
  ])


  getAllList(){
    return this.hopodlist.asObservable();
  }
}
