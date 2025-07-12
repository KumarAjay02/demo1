import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map, Observable, of} from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser, IUserSearch } from './model/user-creation.model';
 

@Injectable({ providedIn: 'root' })
export class UserCreationService {
  private resourceUrl =environment.apiUrl+'/api/create-user';
  private resourceUrlUpdate =environment.apiUrl+'/api/UpdateProfile';
  private resourceUrlAllUsers =environment.apiUrl+'/api/active-users';
  private resourceUrlUserByLogin =environment.apiUrl+'/api/employee-views-card';
  private  resourceUrlXlsx=environment.apiUrl+'/api/employee-views-card';
  private resourceUrlUserSearch =environment.apiUrl+'/api/Users-search';
  constructor(private http: HttpClient) {

  }
  getUserByLoginCode(loginCode: string): Observable<IUser | undefined> {
    return this.http.get<IUser>(`${this.resourceUrlUserByLogin}/${loginCode}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<IUser>) => res.body));
  }
  getUsers(): Observable<IUser[]> {
    return this.http
      .get<IUser[]>(this.resourceUrlAllUsers, { observe: 'response' })
      .pipe(map((res: HttpResponse<IUser[]>) => res.body));
  }
  getUserById(id: number): Observable<IUser | undefined> {
    return this.http.get<IUser>(`${this.resourceUrlUserSearch}/${id}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<IUser>) => res.body));
  }

  createUser(user: IUser): Observable<HttpResponse<IUser>> {
    return this.http
      .post<IUser>(this.resourceUrl, user, { observe: 'response' })
      .pipe(map((res: HttpResponse<IUser>) => res));
  }

  updateUser(user: IUser,id:number): Observable<HttpResponse<IUser>> {
    return this.http
      .put<IUser>(`${this.resourceUrlUpdate}/${id}`, user, { observe: 'response' })
      .pipe(map((res: HttpResponse<IUser>) => res));
  }
  searchUsers(search: IUserSearch): Observable<IUser[]> {
    return this.http
      .post<IUser[]>(`${this.resourceUrlUserSearch}`, search, { observe: 'response' })
      .pipe(map((res: HttpResponse<IUser[]>) => res.body));
  }
  downloadList(search?: IUserSearch): Observable<Blob> {
    return this.http.post(this.resourceUrlXlsx, search, { responseType: 'blob' });
  }
}
