import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ICostType } from './model/costtype.module';
import { ICostTypeSearch } from './model/costtype-search.module';
import { environment } from '../../../../../environments/environment';
 

@Injectable({
  providedIn: 'root'
})
export class CostTypeService {

  public resourceUrl = environment.apiUrl + '/api/CostCodeType';
  private resourceUrlXlsx = environment.apiUrl + '/api/CostCodeType-list-download';

  constructor(private http: HttpClient) { }

  getCostTypeList(): Observable<ICostType[] | null> {
    return this.http
      .get<ICostType[]>(this.resourceUrl, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICostType[]>) => res.body));
  }

  Search(search: ICostTypeSearch): Observable<ICostType[] | null> {
    return this.http
      .post<ICostType[]>(`${this.resourceUrl}-search`, search, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICostType[]>) => res.body));
  }

  getCostTypeById(id: number): Observable<ICostType | null> {
    return this.http.get<ICostType>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICostType>) => res.body));
  }

  updateCostType(acSchedule: ICostType, id: number): Observable<HttpResponse<ICostType>> {
    return this.http
      .put<ICostType>(`${this.resourceUrl}/${id}`, acSchedule, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICostType>) => res));
  }

  createCostType(acSchedule: ICostType): Observable<HttpResponse<ICostType>> {
    return this.http
      .post<ICostType>(this.resourceUrl, acSchedule, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICostType>) => res));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  downloadList(search?: ICostType): Observable<Blob> {
    return this.http.post(this.resourceUrlXlsx, search, { responseType: 'blob' });
  }

  

}
