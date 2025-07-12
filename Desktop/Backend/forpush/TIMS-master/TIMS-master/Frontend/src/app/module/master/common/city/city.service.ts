import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ICity } from './model/city.model';
import { ICitySearch } from './model/city-search.model';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
//  public resourceUrl: string = this.applicationConfigService.getEndpointFor( 'api/CityMasters');

  private resourceUrl =environment.apiUrl+'/api/CityMasters';
  private resourceUrlXlsx=environment.apiUrl+'/api/CityMasters-list-download';
  constructor(private http: HttpClient) {

  }
  getcityList(): Observable<ICity[] | null> {
    return this.http
      .get<ICity[]>(this.resourceUrl, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICity[]>) => res.body));
  }
  citySearch(search: ICitySearch): Observable<ICity[] | null> {
    return this.http
      .post<ICity[]>(`${this.resourceUrl}-search`, search, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICity[]>) => res.body));
  }
  getCityById(id: number): Observable<ICity | null> {
    return this.http.get<ICity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICity>) => res.body));
  }


  update(city: ICity,id:number): Observable<HttpResponse<ICity>> {
    return this.http
      .put<ICity>(`${this.resourceUrl}/${id}`, city, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICity>) => res));
  }

  create(city: ICity): Observable<HttpResponse<ICity>> {
   console.log(city);
    return this.http
      .post<ICity>(this.resourceUrl, city, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICity>) => res));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  downloadList(search?: ICitySearch): Observable<Blob> {
    return this.http.post(this.resourceUrlXlsx, search, { responseType: 'blob' });
  }
}
