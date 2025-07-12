import { Injectable } from '@angular/core';
import { chargesMaster } from '../models/chargesmst';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChargesmstService {




    datalist= new BehaviorSubject<chargesMaster[]>([
      {
        CoCode: 'SUNTEK AXPRESS',
        DivCode: '0526',
        ChargeID: 'CHG001',
        ChargeDesc: 'Freight Charge - New Delhi to Mumbai',
        Applicable: 'Road Transport',
        DebitAc: 'TRN001234567',
        CreditAc: 'REV001234567',
        Rate: '15.50',
        RangeFrom: '10',
        RangeTo: 'Active',
      },
      {
        CoCode: 'SUNTEK AXPRESS',
        DivCode: '0542',
        ChargeID: 'CHG003',
        ChargeDesc: 'Sea Freight - Chennai to Colombo',
        Applicable: 'Sea Transport',
        DebitAc: 'TRN003456789',
        CreditAc: 'REV003456789',
        Rate: '12.75',
        RangeFrom: '100',
        RangeTo: 'active'
      }


    ])

    getBranchList(){

      return this.datalist.asObservable()

    }

}
