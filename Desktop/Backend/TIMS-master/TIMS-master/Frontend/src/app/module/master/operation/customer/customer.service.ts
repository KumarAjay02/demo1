import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ICustomer } from './model/customer.model';
import { ICustomerSearch } from './model/customer-search.model';
import { environment } from '../../../../../environments/environment';
 

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public resourceUrl =environment.apiUrl+'/api/Customer';
  private resourceUrlXlsx=environment.apiUrl+'/api/Customer-list-download';

  constructor(private http: HttpClient) {}

  getCustomerList(): Observable<ICustomer[] | null> {
    return this.http
      .get<ICustomer[]>(this.resourceUrl, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICustomer[]>) => res.body));
  }

  customerSearch(search: ICustomerSearch): Observable<ICustomer[] | null> {
    return this.http
      .post<ICustomer[]>(`${this.resourceUrl}-search`, search, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICustomer[]>) => res.body));
  }
  getCustomerByKey(coCode: string, divCode: string, customerCode: number): Observable<ICustomer> {
    return this.http.get<ICustomer>(`${this.resourceUrl}/${coCode}/${divCode}/${customerCode}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICustomer>) => res.body));
  }
  update(customer: ICustomer, id: number): Observable<HttpResponse<ICustomer>> {
    return this.http
      .put<ICustomer>(`${this.resourceUrl}/${customer.coCode}/${customer.divCode}/${id}`, customer, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICustomer>) => res));
  }

  create(customer: ICustomer): Observable<HttpResponse<ICustomer>> {
    return this.http
      .post<ICustomer>(this.resourceUrl, customer, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICustomer>) => res));
  }

  delete(coCode: string, divCode: string, customerCode: number): Observable<void> {

    return this.http.delete<void>(`${this.resourceUrl}/${coCode}/${divCode}/${customerCode}`);
  }
  downloadList(search?: ICustomerSearch): Observable<Blob> {
    return this.http.post(this.resourceUrlXlsx, search, { responseType: 'blob' });
  }
}
