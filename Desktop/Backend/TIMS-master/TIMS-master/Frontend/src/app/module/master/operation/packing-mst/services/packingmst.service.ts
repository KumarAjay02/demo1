import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { PackingMaster } from '../models/packingmst.model';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PackingmstService {

  private resourceUrl = `${environment.apiUrl}/api/PackingMasters`;
  private resourceUrlXlsx = `${environment.apiUrl}/api/PackingMasters-list-download`;

  constructor(private http: HttpClient) { }

  getListpckmst(): Observable<PackingMaster[]> {
    return this.http
      .get<PackingMaster[]>(this.resourceUrl, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<PackingMaster[]>) => res.body || []),
        catchError(this.handleError<PackingMaster[]>('getListpckmst', []))
      );
  }

  searchByDescriptionPostWithQuery(code: string): Observable<PackingMaster[]> {
    let params = new HttpParams().set('code', code);

    return this.http
      .post<PackingMaster[]>(
        `${this.resourceUrl}-search`,
        null, // No request body
        {
          params: params, // Add query parameters
          observe: 'response'
        }
      )
      .pipe(
        map((res: HttpResponse<PackingMaster[]>) => res.body || []),
        catchError(this.handleError<PackingMaster[]>('searchByDescriptionPostWithQuery', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`API Error - ${operation} failed:`, error.message, error);
      return of(result as T);
    };
  }

  update(code: string, data: PackingMaster): Observable<HttpResponse<PackingMaster>> {
    // Ensure the code in the URL matches the code in the data payload
    return this.http.put<PackingMaster>(`${this.resourceUrl}/${code}`, data, { observe: 'response' })
      .pipe(map((res: HttpResponse<PackingMaster>) => res));
  }

  create(data: PackingMaster): Observable<HttpResponse<PackingMaster>> {
    return this.http.post<PackingMaster>(this.resourceUrl, data, { observe: 'response' })
      .pipe(map((res: HttpResponse<PackingMaster>) => res));
  }
  Delete(code: string): Observable<HttpResponse<PackingMaster>> {
    // Ensure the code in the URL matches the code in the data payload
    return this.http.delete<PackingMaster>(`${this.resourceUrl}/${code}`, {
      observe: 'response'
    });
  }
}
