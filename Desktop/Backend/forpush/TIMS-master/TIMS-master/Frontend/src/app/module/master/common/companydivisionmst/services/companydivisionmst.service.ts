import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CompanyMaster } from '../../companymst/models/companymst.model';
import { CompanyDivisionMaster } from '../models/companydivisonmst.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IDivision } from '../models/division.model';
import { environment } from '../../../../../../environments/environment';
import {ICompany} from '../../companymst/models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanydivisionmstService {

  public resourceUrl = environment.apiUrl + '/api/DivisionMaster';
  public resourceUrlAssigned = environment.apiUrl + '/api/DivisionMaster/assigned';
  constructor(private http: HttpClient) {

  }

  getDivisonList(): Observable<IDivision[] | null> {
    return this.http
      .get<IDivision[]>(this.resourceUrl, { observe: 'response' })
      .pipe(map((res: HttpResponse<IDivision[]>) => res.body));
  }
  getAssignedDivisionList(): Observable<IDivision[] | null> {
    return this.http

      .get<IDivision[]>(this.resourceUrlAssigned, { observe: 'response' })
      .pipe(map((res: HttpResponse<IDivision[]>) => res.body));
  }
}
