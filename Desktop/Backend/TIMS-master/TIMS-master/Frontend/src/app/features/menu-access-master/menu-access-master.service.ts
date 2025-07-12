import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { IMenuAccessMaster } from './menu-access-master.model';
import { IMenuSave } from './menu-save.model';
import { IIvMaster } from './iv-master.model';
import { IMessage } from './message.model';
import { createRequestOption } from '../../shared/request/request-util';
import { IUserRights } from './user-rights.model';
import {environment} from '../../../environments/environment';

type EntityResponseType = HttpResponse<IMenuAccessMaster>;
type EntityArrayResponseType = HttpResponse<IMenuAccessMaster[]>;

@Injectable({ providedIn: 'root' })
export class MenuAccessMasterService {
  //public resourceUrl = this.applicationConfigService.getEndpointFor('api/menu-access-masters');
  public resourceUrl = environment.apiUrl+'/api/menu-access-masters';

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(menuAccessMasters: IMenuSave): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.resourceUrl, menuAccessMasters, { observe: 'response' });
  }

  update(menuAccessMaster: IMenuAccessMaster): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(menuAccessMaster);
    return this.http
      .put<IMenuAccessMaster>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMenuAccessMaster>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  validate(master: IIvMaster): Observable<HttpResponse<IMessage>> {
    return this.http.post<IMessage>(`${this.resourceUrl + '-validate'}`, master, { observe: 'response' });
  }
  getAuthentications(master: IIvMaster): Observable<HttpResponse<IUserRights>> {
    return this.http.post<IUserRights>(`${this.resourceUrl + '-authenticate'}`, master, { observe: 'response' });
  }
  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMenuAccessMaster[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(menuAccessMaster: IMenuAccessMaster): IMenuAccessMaster {
    const copy: IMenuAccessMaster = Object.assign({}, menuAccessMaster, {
      createdDate:
        menuAccessMaster.createdDate != null && menuAccessMaster.createdDate.isValid() ? menuAccessMaster.createdDate.toJSON() : null,
    });
    return copy;
  }



}
