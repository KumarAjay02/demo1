import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';;
import { IEmployeeView } from '../../shared/model/employee-view.model';
import { IEmployeeSearch } from '../../shared/model/employee-search.model';

import { ApplicationConfigService } from '../../core/config/application-config.service';
import { DATE_FORMAT } from '../../config/input.constants';
import {environment} from '../../../environments/environment';
//import moment from 'moment';

type EntityResponseType = HttpResponse<IEmployeeView>;
type EntityArrayResponseType = HttpResponse<IEmployeeView[]>;

@Injectable({ providedIn: 'root' })
export class EmployeeViewService {
  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  private employeeViewUrl: string=environment.apiUrl+'/api/employee-views';

  create(employeeView: IEmployeeView): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employeeView);
    return this.http
      .post<IEmployeeView>(this.employeeViewUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  update(employeeView: IEmployeeView): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employeeView);
    return this.http
      .put<IEmployeeView>( this.employeeViewUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IEmployeeView>(this.employeeViewUrl+`/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  findByCard(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IEmployeeView>(this.employeeViewUrl+`-card/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) =>res));
  }

  findByEmpcode(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IEmployeeView>(this.employeeViewUrl+`-empcode/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  query(req?: IEmployeeSearch): Observable<EntityArrayResponseType> {
    return this.http
      .post<IEmployeeView[]>(this.employeeViewUrl+'-custom', req, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  queryFactory(req?: IEmployeeSearch): Observable<EntityArrayResponseType> {
    return this.http
      .post<IEmployeeView[]>(this.employeeViewUrl+'-custom-factory', req, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(this.employeeViewUrl+`/${id}`, { observe: 'response' });
  }

  //hierarchy(): Observable<HttpResponse<IHierarchyBean>> {
  //  return this.http.get<IHierarchyBean>(this.resourceUrlHierarchy, { observe: 'response' });
  //}

  download(cardNo: any): any {
    return this.http.get(this.employeeViewUrl+`-hierarchy/${cardNo}`, { headers: new HttpHeaders({}), responseType: 'blob' });
  }

  protected convertDateFromClient(employeeView: IEmployeeView): IEmployeeView {
    const copy: IEmployeeView = Object.assign({}, employeeView, {
      doj: employeeView.doj != null && employeeView.doj.isValid() ? employeeView.doj.format(DATE_FORMAT) : null,
      dob: employeeView.dob != null && employeeView.dob.isValid() ? employeeView.dob.format(DATE_FORMAT) : null,
    });
    return copy;
  }
}
