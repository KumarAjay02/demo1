// payable.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPayable } from './model/payable.model';
import { IPayableSearch } from './model/payable-search.model';
import { Observable, of } from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../../../environments/environment';
import {IPayableBranch} from './model/payable-branch.model';

@Injectable({ providedIn: 'root' })
export class PayableService {
  private payables: IPayable[] = [];

  private branchListUrl=environment.apiUrl+'/api/branch-list';
  private branchDetailsUrl=environment.apiUrl+'/api/branch-detail';

  constructor(private http: HttpClient) { }

  getPayableList(): Observable<IPayable[]> {
    return of(this.payables);
    // Replace above line with actual HTTP when backend ready
    // return this.http.get<IPayable[]>('/api/payable');
  }

  getPayableById(id: number): Observable<IPayable | undefined> {
    return of(this.payables.find(p => p.Id === id));
  }

  update(payable: IPayable, id: number): Observable<IPayable> {
    const index = this.payables.findIndex(p => p.Id === id);
    if (index !== -1) {
      this.payables[index] = payable;
    } else {
      payable.Id = this.payables.length + 1;
      this.payables.push(payable);
    }
    return of(payable);
  }

  delete(id: number): Observable<any> {
    this.payables = this.payables.filter(p => p.Id !== id);
    return of({ status: 200 });
  }

  payableSearch(criteria: IPayableSearch): Observable<IPayable[]> {
    // Fake local filtering (replace with HTTP POST later)
    return of(this.payables.filter(p =>
      (!criteria.PayableName || p.PayableName?.toLowerCase().includes(criteria.PayableName.toLowerCase())) &&
      (!criteria.PanNo || p.PayableId?.toLowerCase().includes(criteria.PanNo.toLowerCase()))
    ));
  }
  getBranchByCode(branchCode?: string): Observable<IPayableBranch> {
    return this.http.post<IPayableBranch>(
      this.branchDetailsUrl,
      branchCode
    );
  }
  getBranchList(): Observable<IPayableBranch[]> {
    return this.http.get<IPayableBranch[]>(
      this.branchListUrl
    );
  }
}
