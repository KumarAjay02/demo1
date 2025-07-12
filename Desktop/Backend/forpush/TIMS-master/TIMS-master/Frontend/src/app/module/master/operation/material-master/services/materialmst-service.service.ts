import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MaterialMaster } from '../models/materialmst.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialmstServiceService {




  materialmst=new BehaviorSubject<MaterialMaster[]>([
    {CompanyCode:'AGI',Description:'AGRICULTURE PRODUCTS',TaxApplicable:'N',Status:'YES'},
    {CompanyCode:'CB',Description:'CARTOON BOX',TaxApplicable:'Y',Status:'No'}
  ])


  getListmaterial(){
    return this.materialmst.asObservable();
  }
}
