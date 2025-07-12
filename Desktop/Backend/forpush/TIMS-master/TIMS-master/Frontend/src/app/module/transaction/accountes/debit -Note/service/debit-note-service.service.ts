import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { debitnote } from '../model/debitNote';
@Injectable({
  providedIn: 'root'
})
export class DebitNoteServiceService {
datalist= new BehaviorSubject<debitnote[]>([

        {
          "FinancialYear": "2025",
          "BranchCode": "ALW-ALWAR",
          "FromDate": "16-05-2025",
           "ToDate": "16-06-2025",
          "DocType":"CUSTOMER BILL"
        },    
         {
          "FinancialYear": "2025",
          "BranchCode": "AMC-AMBALA",
          "FromDate": "16-05-2025",
           "ToDate": "16-06-2025",
          "DocType":"SALARY PAYMENT"
        },    
        ])
        // constructor() { }
        getBranchList(){
      
          return this.datalist.asObservable()
      
        }
        getmstById(id:any){
        }
  
}
