import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';;
import { IEmployeeView } from '../../shared/model/employee-view.model';
import { IEmployeeSearch } from '../../shared/model/employee-search.model';

import { ApplicationConfigService } from '../../core/config/application-config.service';
import { DATE_FORMAT } from '../../config/input.constants';
import {environment} from '../../../environments/environment';
import {Filter, IFilter} from '../model/filter.model';
 
import {CityFilter, ICityFilter} from '../model/cityFilter.model';
 
import {BranchFilter, IBranchFilter} from '../model/branchFilter.model';
import { IBranch } from '../../module/master/common/branch-mst/models/branch.model';
import { ICity } from '../../module/master/common/city/model/city.model';
import { ICountry } from '../../module/master/common/country/model/country.model';
import { IPinCodeMaster } from '../../module/master/common/pincodemst/form/models/pincodemst.model';
import { IState } from '../../module/master/common/state/model/state.model';
import { IStateFilter, StateFilter } from '../model/stateFilter.model';
//import moment from 'moment';

@Injectable({ providedIn: 'root' })
export class MasterFilterService {
  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  private pinCodeFilterUrl: string=environment.apiUrl+'/api/PincodeMaster-filter';
  private countryFilterUrl: string=environment.apiUrl+'/api/Country-filter';
  private stateFilterUrl: string=environment.apiUrl+'/api/state-filter';
  private cityFilterUrl: string=environment.apiUrl+'/api/city-filter';
  private branchFilterUrl: string=environment.apiUrl+'/api/branch-filter';

  pinCodeFilter(txt: string): Observable<HttpResponse<IPinCodeMaster[]>> {
    const req: IFilter=new Filter();
    req.txt=txt;
    return this.http
      .post<IPinCodeMaster[]>(this.pinCodeFilterUrl, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<IPinCodeMaster[]>) => res));
  }
  countryFilter(txt: string): Observable<HttpResponse<ICountry[]>> {
    const req: IFilter=new Filter();
    req.txt=txt;
    return this.http
      .post<ICountry[]>(this.countryFilterUrl, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICountry[]>) => res));
  }
  stateFilter(countryCode:string,txt: string): Observable<HttpResponse<IState[]>> {
    const req: IStateFilter=new StateFilter(countryCode,txt);
    console.log(req);
    return this.http
      .post<IState[]>(this.stateFilterUrl, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<IState[]>) => res));
  }
  cityFilter(stateCode:string,txt: string): Observable<HttpResponse<ICity[]>> {
    const req: ICityFilter=new CityFilter(stateCode,txt);
    console.log(req);
    return this.http
      .post<ICity[]>(this.cityFilterUrl, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<ICity[]>) => res));
  }
  branchFilter(txt: string): Observable<HttpResponse<IBranch[]>> {
    const req: IBranchFilter=new BranchFilter(txt);
    return this.http
      .post<IBranch[]>(this.branchFilterUrl, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<IBranch[]>) => res));
  }
}
