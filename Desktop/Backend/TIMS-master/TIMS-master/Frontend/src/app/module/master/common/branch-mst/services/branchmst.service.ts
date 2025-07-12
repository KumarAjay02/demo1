import { Injectable } from '@angular/core';
 
import {BehaviorSubject, map, Observable} from 'rxjs';
 
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {IBranch} from '../models/branch.model';
 


@Injectable({
  providedIn: 'root'
})
export class BranchmstService {
  public resourceUrl = environment.apiUrl + '/api/BranchMaster';
  public resourceUrlAssigned= environment.apiUrl + '/api/BranchMaster/assigned';
  constructor(private http: HttpClient) {

  }
  getBranchList(): Observable<IBranch[] | null> {
    return this.http
      .get<IBranch[]>(this.resourceUrl, { observe: 'response' })
      .pipe(map((res: HttpResponse<IBranch[]>) => res.body));
  }
  getAssignedBranchList(): Observable<IBranch[] | null> {
    return this.http

      .get<IBranch[]>(this.resourceUrlAssigned, { observe: 'response' })
      .pipe(map((res: HttpResponse<IBranch[]>) => res.body));
  }
  getBranchByCode(branchCode: string): Observable<IBranch | null> {
    return this.http
      .get<IBranch>(`${this.resourceUrl}/${branchCode}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<IBranch>) => res.body));
  }
}
