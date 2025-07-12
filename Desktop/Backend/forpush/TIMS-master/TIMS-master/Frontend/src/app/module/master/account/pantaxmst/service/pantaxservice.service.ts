import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PantaxModels, PanTaxSpecial } from '../models/pantaxmodel';

@Injectable({
  providedIn: 'root'
})
export class PantaxserviceService {

  constructor() { }


  pantax=new BehaviorSubject<PantaxModels[]>([
    {panNumberCode:'AG',Status:'Active',Tax_rate:20,AccountCode:'20137T',Financial_Year:2025},
    {panNumberCode:'DG',Status:'Active',Tax_rate:25,AccountCode:'20137T',Financial_Year:2025}
     
  ])

  PantaxSpecial=new BehaviorSubject<PanTaxSpecial[]>([
    {PanNumberCode:'AG',PanNumber:'ARPVY7452G',Status:'active'},
    {PanNumberCode:'DH',PanNumber:'DRPVY7452H',Status:'active'},
  ])


  gettaxSpecial(){
    return this.PantaxSpecial.asObservable();
  }

  getPantext(){
    return this.pantax.asObservable();
  }

}
