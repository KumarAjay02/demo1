import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { IAccount_Nature, IAccount_NatureSearch } from './model/ac-nature.model';
import { environment } from '../../../../../environments/environment';
 

@Injectable({ providedIn: 'root' })
export class AcNatureService {

  public resourceUrl = environment.apiUrl + '/api/AccountNature';
  private resourceUrlXlsx = environment.apiUrl + '/api/AccountNature-list-download';

  constructor(private http: HttpClient) {  }

  getAcNatureList(): Observable<IAccount_Nature[] | null> {
    return this.http
      .get<IAccount_Nature[]>(this.resourceUrl, { observe: 'response' })
      .pipe(map((res: HttpResponse<IAccount_Nature[]>) => res.body));
  }

  acNatureSearch(search: IAccount_NatureSearch): Observable<IAccount_Nature[] | null> {
    return this.http
      .post<IAccount_Nature[]>(`${this.resourceUrl}-search`, search, { observe: 'response' })
      .pipe(map((res: HttpResponse<IAccount_Nature[]>) => res.body));
  }

  getAcNatureById(id: number): Observable<IAccount_Nature | null> {
    return this.http.get<IAccount_Nature>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<IAccount_Nature>) => res.body));
  }

  updateAcNature(acNature: IAccount_Nature, id: number): Observable<HttpResponse<IAccount_Nature>> {
    return this.http
      .put<IAccount_Nature>(`${this.resourceUrl}/${id}`, acNature, { observe: 'response' })
      .pipe(map((res: HttpResponse<IAccount_Nature>) => res));
  }

  createAcNature(acNature: IAccount_Nature): Observable<HttpResponse<IAccount_Nature>> {
    return this.http
      .post<IAccount_Nature>(this.resourceUrl, acNature, { observe: 'response' })
      .pipe(map((res: HttpResponse<IAccount_Nature>) => res));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  downloadList(search?: IAccount_NatureSearch): Observable<Blob> {
    return this.http.post(this.resourceUrlXlsx, search, { responseType: 'blob' });
  }

}
