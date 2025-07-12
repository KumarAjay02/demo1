import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IRights } from './model/rights.model';
import { IUserRights } from '../menu-access-master/user-rights.model';
import { IUsers } from './model/users.model';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class RightsService {
  // public resourceUrlUserList = this.applicationConfigService.getEndpointFor('api/active-users');
  // public resourceUrlRightsByUser = this.applicationConfigService.getEndpointFor('api/rights-by-user');
  // public resourceUrl=this.applicationConfigService.getEndpointFor('api/assign-rights');
  public resourceUrlUserList = environment.apiUrl+'/api/active-users';
  public resourceUrlRightsByUser = environment.apiUrl+'/api/rights-by-user';
  public resourceUrl= environment.apiUrl+'/api/assign-rights';


  // private countries: IRights[] = [{ menuId: 1, menuName: 'Admin', menuType: 'Parent', add: true, view: true, update: true, isActive: true }];
  constructor(
    protected http: HttpClient,
  ) {}


  getRightsById(id: number): Observable<HttpResponse<IRights[]>> {
    return this.http.get<IRights[]>(`${this.resourceUrlRightsByUser}/${id}`, { observe: 'response' });
  }

  updateRights(userRights: IUserRights[]): Observable<HttpResponse<IUserRights[]>> {
    console.log(userRights);

    return this.http
      .put<IUserRights[]>(this.resourceUrl, userRights, { observe: 'response' })
  }
  // find(id: number): Observable<IRights | undefined> {
  //   // return this.http
  //   //   .get<IRights>(`${this.resourceUrl}/${id}`, { observe: 'response' })
  //   //   .pipe(map((res: IRights) => this.convertDateFromServer(res)));
  //   return of(this.countries.find(rights => rights.menuId === id));
  // }

  getUserList(): Observable<HttpResponse<IUsers[]>> {
    return this.http.get<IUsers[]>(`${this.resourceUrlUserList}`, { observe: 'response' });
  }
}
