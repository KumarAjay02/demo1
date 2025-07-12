import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { BookingBasisMaster } from '../models/bookingbasicmst.model';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { PackingMaster } from '../../operation/packing-mst/models/packingmst.model';

@Injectable({
  providedIn: 'root'
})
export class BookingbasicmstService {
  
  
//start
  private resourceUrl = `${environment.apiUrl}/api/BookingBasisMode`;
  constructor(private http: HttpClient) { }

  // this api for list v
  getBookingBasisList(): Observable<BookingBasisMaster[]> {
    return this.http.get<BookingBasisMaster[]>(this.resourceUrl)
  }
  handleError<T>(arg0: string, arg1: undefined[]): (err: any, caught: Observable<BookingBasisMaster[]>) => import("rxjs").ObservableInput<any> {
    throw new Error('Method not implemented.');
  }
// search query 
searchByDescriptionPostWithQuery(code: string): Observable<BookingBasisMaster[]> {
  const params = new HttpParams().set('code', code);
  return this.http.post<BookingBasisMaster[]>(`${this.resourceUrl}-search`, null, {
    params,
    observe: 'response' as const // or omit if you don't need full response
  }).pipe(map(res => res.body!));
}
  // this is for create the bookingbasisMode
    create(data: BookingBasisMaster): Observable<HttpResponse<BookingBasisMaster>> {
      return this.http.post<BookingBasisMaster>(this.resourceUrl, data, { observe: 'response' })
        .pipe(map((res: HttpResponse<BookingBasisMaster>) => res));
    }

  // this is for update data 
  update(code: string, data: BookingBasisMaster): Observable<HttpResponse<BookingBasisMaster>> {
    return this.http.put<BookingBasisMaster>(`${this.resourceUrl}/${code}`, data, { observe: 'response' })
      .pipe(map((res: HttpResponse<BookingBasisMaster>) => res));
  }

    // this is delete method
   Delete(code: string): Observable<HttpResponse<BookingBasisMaster>> {
    return this.http.delete<BookingBasisMaster>(`${this.resourceUrl}/${code}`, {
      observe: 'response'
    });
  }
}
