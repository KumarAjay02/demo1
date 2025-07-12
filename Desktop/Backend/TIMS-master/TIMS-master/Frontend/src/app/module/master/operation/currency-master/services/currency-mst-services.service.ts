import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { currencyModels } from '../models/currencyModel';

@Injectable({
  providedIn: 'root'
})
export class CurrencyMstServicesService {

    datalist=new BehaviorSubject<currencyModels[]>([
  
    {
      currency:"USD",currencyCountry:'USA',currencyUnitRate:0,inrRate:1.5,
    },
     {
      currency:"USD",currencyCountry:'USA',currencyUnitRate:0,inrRate:1.5,
    },
   
  ])
  getAllCurrency(){
    return this.datalist.asObservable();
  }
}
