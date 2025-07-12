import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GstrateMaster } from '../model/gstratemst.model';

@Injectable({
  providedIn: 'root'
})
export class GstratemstService {





gstrate=new BehaviorSubject<GstrateMaster[]>([
  {TaxId:10,sac:'	996511',EffectedFromDate:'25may2025',Status:'active'},
  {TaxId:5,sac:'	996512, 996521',EffectedFromDate:'20may2025',Status:'active'},
])


getgstrate(){
 return this.gstrate.asObservable();
}

}
