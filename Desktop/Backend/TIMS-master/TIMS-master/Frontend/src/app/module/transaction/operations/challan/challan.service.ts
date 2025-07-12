// challan.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IChallanEntry } from './model/challan.model';
import { IChallanSearch } from './model/challan-search.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
 

@Injectable({ providedIn: 'root' })
export class ChallanService {
  private challans: IChallanEntry[] = [{
    challanNumber:'123',
    challanType: 'LONGROUTE',
    id: 1,
    date: '2025-05-14',
    toBranch: 'Mumbai',
    mode: 'ROAD',
    route: 'Delhi to Mumbai',
    vehicleNumber: 'MH12AB1234',
    sealNo: 'SEAL9876',
    docketNo: 'DKT123456',
    remark: 'Handle with care',
    pDate: '2025-05-14',
    pVehicleNumber: 'MH12CD5678',
    pConsEwayBill: 'EWB1234567890',
    LDate: '2025-05-14',
    LToBranch: 'Pune',
    LDataTransfer: 'Yes',
    LVehicleNumber: 'MH14EF9012',
    LTCSNo: 'TCS998877',
    LDocketNo: 'LDKT456789',
    LSDate: '2025-05-14',
    LSVehicleNumber: 'MH16GH3456',
    LSdocketNo: 'LSDKT654321',
    dDate:'15-05-2025',
    dDocketNo:'test',
    dVehicleNumber:'MH16GH3456',
    entryBy: 'admin',
    entryDate: '2025-05-14',
    updatedBy: 'supervisor',
    updatedDate: '2025-05-14'
  },{
    challanNumber:'1234',
    challanType: 'DRS',
    id: 2,
    date: '15/05/2025',
    toBranch: 'Mumbai',
    mode: 'ROAD',
    route: 'Delhi to Mumbai',
    vehicleNumber: 'MH12AB1234',
    sealNo: 'SEAL9876',
    docketNo: 'DKT123456',
    remark: 'Handle with care',
    pDate: '2025-05-14',
    pVehicleNumber: 'MH12CD5678',
    pConsEwayBill: 'EWB1234567890',
    LDate: '2025-05-14',
    LToBranch: 'Pune',
    LDataTransfer: 'Yes',
    LVehicleNumber: 'MH14EF9012',
    LTCSNo: 'TCS998877',
    LDocketNo: 'LDKT456789',
    LSDate: '2025-05-14',
    LSVehicleNumber: 'MH16GH3456',
    LSdocketNo: 'LSDKT654321',
    dDate:'15-05-2025',
    dDocketNo:'test',
    dVehicleNumber:'MH16GH3456',
    entryBy: 'admin',
    entryDate: '2025-05-14',
    updatedBy: 'supervisor',
    updatedDate: '2025-05-14'
  }];
  private apiUrl = environment.apiUrl + '/api/challan';

  constructor(private http: HttpClient) { }

  getChallanList(): Observable<IChallanEntry[]> {
    return of(this.challans);
    // Replace with actual HTTP call when backend ready
    // return this.http.get<IChallan[]>(this.apiUrl);
  }

  getChallanById(id: number): Observable<IChallanEntry | undefined> {
    return of(this.challans.find(c => c.id == id));
  }

  create(challan: IChallanEntry): Observable<IChallanEntry> {
    challan.id = this.challans.length + 1;
    this.challans.push(challan);
    return of(challan);
  }

  update(challan: IChallanEntry): Observable<IChallanEntry> {
    const index = this.challans.findIndex(c => c.id === challan.id);
    if (index !== -1) {
      this.challans[index] = challan;
    }
    return of(challan);
  }

  delete(id: number): Observable<any> {
    this.challans = this.challans.filter(c => c.id !== id);
    return of({ status: 200 });
  }

  search(criteria: IChallanSearch): Observable<IChallanEntry[]> {
    // Fake local filtering (replace with HTTP POST later)
    return of(this.challans);
  }
}
