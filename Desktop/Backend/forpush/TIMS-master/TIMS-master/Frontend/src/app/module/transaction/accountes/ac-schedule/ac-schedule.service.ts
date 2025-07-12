import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IAC_Schedule } from './model/ac-schedule.model';
import { environment } from '../../../../../environments/environment';
import { IAC_ScheduleSearch } from './model/ac-schedule-search.model';
import { IAccount_Nature } from '../ac-nature/model/ac-nature.model';
import { Filter, IFilter } from '../../../../shared/model/filter.model';


@Injectable({
  providedIn: 'root'
})
export class ACScheduleService {

  public resourceUrl = environment.apiUrl + '/api/AccountSchedule';
  private resourceUrlXlsx = environment.apiUrl + '/api/AccountSchedule-list-download';
  private countryFilterUrl: string = environment.apiUrl + '/api/AccountSchedule-filter';
  constructor(private http: HttpClient) { }

  getAcScheduleList(): Observable<IAC_Schedule[] | null> {
    return this.http
      .get<IAC_Schedule[]>(this.resourceUrl, { observe: 'response' })
      .pipe(map((res: HttpResponse<IAC_Schedule[]>) => res.body));
  }

  acScheduleSearch(search: IAC_ScheduleSearch): Observable<IAC_Schedule[] | null> {
    return this.http
      .post<IAC_Schedule[]>(`${this.resourceUrl}-search`, search, { observe: 'response' })
      .pipe(map((res: HttpResponse<IAC_Schedule[]>) => res.body));
  }

  getAcScheduleById(id: number): Observable<IAC_Schedule | null> {
    return this.http.get<IAC_Schedule>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<IAC_Schedule>) => res.body));
  }

  updateAcSchedule(acSchedule: IAC_Schedule, id: number): Observable<HttpResponse<IAC_Schedule>> {
    return this.http
      .put<IAC_Schedule>(`${this.resourceUrl}/${id}`, acSchedule, { observe: 'response' })
      .pipe(map((res: HttpResponse<IAC_Schedule>) => res));
  }

  createAcSchedule(acSchedule: IAC_Schedule): Observable<HttpResponse<IAC_Schedule>> {
    return this.http
      .post<IAC_Schedule>(this.resourceUrl, acSchedule, { observe: 'response' })
      .pipe(map((res: HttpResponse<IAC_Schedule>) => res));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  downloadList(search?: IAC_ScheduleSearch): Observable<Blob> {
    return this.http.post(this.resourceUrlXlsx, search, { responseType: 'blob' });
  }

  acNatureFilter(txt: string): Observable<HttpResponse<IAccount_Nature[]>> {
    const req: IFilter = new Filter();
    req.txt = txt;
    return this.http
      .post<IAccount_Nature[]>(this.countryFilterUrl, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<IAccount_Nature[]>) => res));
  }
}
