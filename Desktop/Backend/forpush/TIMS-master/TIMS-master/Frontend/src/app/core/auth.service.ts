import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ApiService } from './api.service';
import {catchError, firstValueFrom, Observable, of, ReplaySubject, shareReplay, tap} from 'rxjs';
import {Account} from './account.model';
import {ApplicationConfigService} from './config/application-config.service';
import {HttpClient} from '@angular/common/http';
import {StateStorageService} from './auth/state-storage.service';
import {IRights} from '../shared/model/rights.model';
import {Login} from '../features/login/login.model';
import {map} from 'rxjs/operators';


interface JwtToken {
  id_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accountCache$?: Observable<Account> | null;
  private userIdentity: Account | null = null;
  private authenticationState = new ReplaySubject<Account | null>(1);

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private applicationConfigService: ApplicationConfigService,
    private stateStorageService: StateStorageService,
  ) { }

  login(credentials: Login): Observable<void> {

    // return this.http
    //   .post<JwtToken>('api/authenticate', credentials)
    //   .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
    return this.apiService
      .post<JwtToken>('api/authenticate', credentials)
      .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
  }
  private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
    this.stateStorageService.storeAuthenticationToken(response.id_token, rememberMe);
  }

  identity(force?: boolean): Observable<Account | null> {
    // console.log('Identity:', this.accountCache$);
    if (!this.accountCache$ || force) {
      this.accountCache$ = this.fetch().pipe(
        tap((account: Account) => {
          this.authenticate(account);
          this.navigateToStoredUrl();
        }),
        shareReplay(),

      );
    }
    return this.accountCache$.pipe(catchError(() => of(null)));
  }
  private navigateToStoredUrl(): void {
    const previousUrl = this.stateStorageService.getUrl();
    if (previousUrl) {
      this.stateStorageService.clearUrl();
      this.router.navigateByUrl(previousUrl);
    }
  }
  private fetch(): Observable<Account> {
    return this.apiService.get<Account>('api/account');
  }
  authenticate(identity: Account | null): void {
    this.userIdentity = identity;
    this.authenticationState.next(this.userIdentity);
    if (!identity) {
      this.accountCache$ = null;
    }
  }
  getToken(): string {
    return this.stateStorageService.getAuthenticationToken() ?? '';
  }
  logout(): Observable<void> {
    return new Observable(observer => {
      this.stateStorageService.clearAuthenticationToken();
      observer.complete();
    });

  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  get currentUser(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode(token); // 👈 You already imported jwtDecode
    } catch (error) {
      return error;
    }
  }
  searchOptions(mnu: string): Observable<IRights[]> {
    return this.apiService.get<IRights[]>(`api/menu-search/${mnu}`);
  }
  private clearAuth(): void {
    this.stateStorageService.clearAuthenticationToken();
    localStorage.removeItem('auth_token');
    this.userIdentity = null;
    this.authenticationState.next(null);
    this.accountCache$ = null;
  }
}
