import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FinancialYearModel } from '../models/financialyearopening.model';

@Injectable({
  providedIn: 'root'
})
export class FinancialyearopeaningService {

  constructor() { }


year=new BehaviorSubject<FinancialYearModel[]>([
  {AccountYear:'2025',startDate:'01apr2025',
    Todate:'31mar2026',Status:'open',ViewYear:'2025'}
])


getYear(){
 return this.year.asObservable();
}
}
