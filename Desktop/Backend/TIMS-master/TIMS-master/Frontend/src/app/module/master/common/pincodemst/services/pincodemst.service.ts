import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPinCodeMaster } from '../form/models/pincodemst.model';

@Injectable({
  providedIn: 'root'
})
export class PincodemstService {





    pincodemst=new BehaviorSubject<IPinCodeMaster[]>([
    {pinCode:275125},
    {pinCode:122004},
  ])



  getPincodeList(){
    return this.pincodemst.asObservable();
  }

}
