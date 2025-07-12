// country.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map, Observable, of} from 'rxjs';
import { ICountry } from './model/country.model';
 
 
import {ICountrySearch} from './model/country-search.model';
 
import { environment } from '../../../../../environments/environment';
import { ApiResponse } from '../../../../shared/model/ApiResponseMsg';
 

@Injectable({ providedIn: 'root' })
export class CountryService {

  private resourceUrl =environment.apiUrl+'/api/Country';
  private resourceUrlXlsx=environment.apiUrl+'/api/Country-list-download';
  constructor(private http: HttpClient) {}
  
 countrySearch(search:ICountrySearch): Observable<ICountry[] | null> {
    return this.http
      .post<ICountry[]>(`${this.resourceUrl}-search`, search, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICountry[]>) => res.body));
  }

 getCountryList(): Observable<ApiResponse<ICountry[]>>{
  return this.http.get<ApiResponse<ICountry[]>>(
    `${this.resourceUrl}/GetCountryList`
  );
}
 
  getCountryById(id: any): Observable<ApiResponse<ICountry[]>| undefined> {
    return this.http.get<ApiResponse<ICountry[]>>(
      `${this.resourceUrl}/GetCountryById/${id}` 
  )}

//  update(id: any, country: ICountry): Observable<ApiResponse<ICountry>> {
//   return this.http.put<ApiResponse<ICountry>>(
//     `${this.resourceUrl}/UpdateCountry/${id}`,country
//   );
// }

update(id: any, country: ICountry): Observable<HttpResponse<ApiResponse<ICountry>>> {
  return this.http.put<ApiResponse<ICountry>>(
    `${this.resourceUrl}/UpdateCountry/${id}`,
    country,
    { observe: 'response' } // ✅ this enables full response access
  );
}
  create(country: ICountry): Observable<ApiResponse<ICountry>> {
    return this.http.post<ApiResponse<ICountry>>(
      `${this.resourceUrl}/CreateCountry`,country
    );
  }

  delete(id: any): Observable<ApiResponse<ICountry>> {
    return this.http.delete<ApiResponse<ICountry>>(
      `${this.resourceUrl}/DeleteCountry/${id}`
    )
  }
  downloadList(search?: ICountrySearch): Observable<Blob> {
    return this.http.post(this.resourceUrlXlsx, search, { responseType: 'blob' });
  }
}
