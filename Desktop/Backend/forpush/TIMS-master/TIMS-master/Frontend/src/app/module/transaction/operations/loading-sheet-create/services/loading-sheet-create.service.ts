import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingSheetCreate } from '../models/loadingSheetCreate.model';

@Injectable({
  providedIn: 'root'
})
export class LoadingSheetCreateService {




  loadingSheet=new BehaviorSubject<LoadingSheetCreate[]>([
    {LoadingSheetNo:250,Route:'JPR TO BNGT',VehicleNo:'RJ32GC5607',DwbNo:'11379304',Barcode:11379304001},
    {LoadingSheetNo:251,Route:'JPR TO BNGT',VehicleNo:'RJ32GC5607',DwbNo:'11379306',Barcode:11379306001},
  ])

  getLoadingSheet(){
   return this.loadingSheet.asObservable();
  }
}
