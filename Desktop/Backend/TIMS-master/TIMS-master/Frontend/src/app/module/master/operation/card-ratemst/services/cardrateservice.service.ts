import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardRateMaster } from '../models/cardRate.model';

@Injectable({
  providedIn: 'root'
})
export class CardrateserviceService {




  cardRateList=new BehaviorSubject<CardRateMaster[]>([
    {FromBranch:'ABD',FromBranchDescription:'Aurangabad',ToBranch:'ALW',ToBranchDescription:'Alwar',
      Rate:8,Tat:6,Mode:'ROAD',FromZone:'PUNE'
    },
    {FromBranch:'ABD',FromBranchDescription:'Aurangabad',ToBranch:'CCU',ToBranchDescription:'KOLKATA',
      Rate:11,Tat:9,Mode:'ROAD',FromZone:'PUNE'
    }
  ])

  getAllCardList(){
   return this.cardRateList.asObservable();
  }
}
