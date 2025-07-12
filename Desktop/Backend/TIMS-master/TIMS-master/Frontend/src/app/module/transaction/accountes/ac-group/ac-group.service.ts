import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IAccount_Groups } from './model/ac-group.module';

@Injectable({
  providedIn: 'root'
})
export class AcGroupServiceService {
  private AcGroups: IAccount_Groups[] = [
    { SerialNo: 1, AC_Nature: 1, ScheduleCode: 101, GroupCode: 10101, GroupDesc: 'BRANCH & DIVISION', Bs_GroupDesc: 'Branch & Division', IsActive: true },
    { SerialNo: 2, AC_Nature: 1, ScheduleCode: 101, GroupCode: 10102, GroupDesc: 'PL BRANCH DIVISION', Bs_GroupDesc: 'Pl Branch Division', IsActive: true },
    { SerialNo: 3, AC_Nature: 1, ScheduleCode: 102, GroupCode: 10201, GroupDesc: 'CASH IN HAND', Bs_GroupDesc: 'Cash In Hand', IsActive: true },
    { SerialNo: 4, AC_Nature: 1, ScheduleCode: 103, GroupCode: 10301, GroupDesc: 'BANK ACCOUNT', Bs_GroupDesc: 'Bank Account', IsActive: true },
    { SerialNo: 5, AC_Nature: 1, ScheduleCode: 103, GroupCode: 10302, GroupDesc: 'BRANCH ACCOUNT', Bs_GroupDesc: 'Branch Account', IsActive: true },
    { SerialNo: 6, AC_Nature: 1, ScheduleCode: 103, GroupCode: 10303, GroupDesc: 'OTHER CURRENT ASSETS', Bs_GroupDesc: 'Other Current Assets', IsActive: true },
  ];

  getAcGroups(): Observable<IAccount_Groups[]> {
    return of(this.AcGroups);
  }

  getAcGroupById(id: any): Observable<IAccount_Groups | undefined> {
    return of(this.AcGroups.find(AcGroup => AcGroup.SerialNo === id));
  }

  updateAcGroups(updatedAcGroup: IAccount_Groups): Observable<IAccount_Groups> {
    const index = this.AcGroups.findIndex(AcGroup => AcGroup.SerialNo === updatedAcGroup.SerialNo);
    if (index !== -1) {
      this.AcGroups[index] = updatedAcGroup;
    }
    return of(updatedAcGroup);
  }

  delete(id: number): Observable<HttpResponse<any>> {
    this.AcGroups = this.AcGroups.filter(AcGroup => AcGroup.SerialNo !== id);
    return of(new HttpResponse({ status: 200 }));
  }
}
