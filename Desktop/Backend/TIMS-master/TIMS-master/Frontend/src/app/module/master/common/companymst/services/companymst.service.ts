import { Injectable } from '@angular/core';
import { CompanyMaster } from '../models/companymst.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';

import { ICompany } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanymstService {

  public resourceUrl = environment.apiUrl + '/api/Company';
  public resourceUrlAssigned = environment.apiUrl + '/api/Company/assigned';
  constructor(private http: HttpClient) {

  }
  getCompanyList(): Observable<ICompany[] | null> {
    return this.http

      .get<ICompany[]>(this.resourceUrl, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICompany[]>) => res.body));
  }
  getAssignedCompanyList(): Observable<ICompany[] | null> {
    return this.http

      .get<ICompany[]>(this.resourceUrlAssigned, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICompany[]>) => res.body));
  }
}
