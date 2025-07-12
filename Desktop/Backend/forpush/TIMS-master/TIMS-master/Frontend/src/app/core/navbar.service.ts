import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ApplicationConfigService} from './config/application-config.service';
import {IMenuItem} from '../layouts/navbar/model/menu-item.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavBarServices {


  constructor(private http: HttpClient, protected applicationConfigService: ApplicationConfigService) { }

  private menuListUrl=environment.apiUrl+'/api/menu-list';
  private menuListUrlAll=environment.apiUrl+'/api/menu-list-all';
  //getMenuItems(usr: string): Observable<IMenuItem[]> {
  getMenuItems(usr: string): Observable < HttpResponse < IMenuItem[] >> {
    return this.http.get<IMenuItem[]>(this.menuListUrl+`/${usr}`, { observe: 'response' });

  }
  getAllMenuItems(usr: string): Observable < HttpResponse < IMenuItem[] >> {
    return this.http.get<IMenuItem[]>(this.menuListUrlAll+`/${usr}`, { observe: 'response' });

  }
}
