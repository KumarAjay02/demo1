import { Injectable } from '@angular/core';
import { marketvehiclerequestmodels } from '../models/marketvehiclerequestmodels';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { ICustomer } from '../../../../master/operation/customer/model/customer.model';
import { ICustomerSearch } from '../../../../master/operation/customer/model/customer-search.model';
import { environment } from '../../../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MarketvehiclerequestservicesService {
  datalist= new BehaviorSubject<marketvehiclerequestmodels[]>([
        {
          "RequestNo": "1",
          "RequestDate": "20-05-2025",
          "FromBranch": "Uttar pradesh",
           "ToBranch": "Delhi",
          "RequirementType":"Used For "
        },    
        ])
        // constructor() { }
        getBranchList(){
      
          return this.datalist.asObservable()
      
        }
        getmstById(id:any){
        }
        

        //testing


        public resourceUrl =environment.apiUrl+'api/CustomerMasters';

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

  getCustomerById(id: number): Observable<ICustomer | null> {
    return this.http
      .get<ICustomer>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICustomer>) => res.body));
  }

  update(customer: ICustomer, id: number): Observable<HttpResponse<ICustomer>> {
    return this.http
      .put<ICustomer>(`${this.resourceUrl}/${id}`, customer, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICustomer>) => res));
  }

  create(customer: ICustomer): Observable<HttpResponse<ICustomer>> {
    return this.http
      .post<ICustomer>(this.resourceUrl, customer, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICustomer>) => res));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
