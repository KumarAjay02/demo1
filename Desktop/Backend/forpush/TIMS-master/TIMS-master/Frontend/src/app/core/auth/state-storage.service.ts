import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StateStorageService {
  private previousUrlKey = 'previousUrl';
  //private authenticationKey = 'jhi-authenticationToken';
  private authenticationKey = 'auth_token';
  private companyKey = 'sel_company';
  private divisionKey = 'sel_division';
  private branchKey = 'branch_key';

  storeUrl(url: string): void {
    sessionStorage.setItem(this.previousUrlKey, JSON.stringify(url));
  }

  getUrl(): string | null {
    const previousUrl = sessionStorage.getItem(this.previousUrlKey);
    return previousUrl ? (JSON.parse(previousUrl) as string | null) : previousUrl;
  }
  getSelCompany(): string | null {
    return sessionStorage.getItem(this.companyKey);
  }
  getSelDivision(): string | null {
    return sessionStorage.getItem(this.divisionKey);
  }
  getSelBranch(): string | null {
    return sessionStorage.getItem(this.branchKey);
  }
  clearUrl(): void {
    sessionStorage.removeItem(this.previousUrlKey);
  }

  storeAuthenticationToken(authenticationToken: string, rememberMe: boolean): void {
    authenticationToken = JSON.stringify(authenticationToken);
    this.clearAuthenticationToken();
    if (rememberMe) {
      localStorage.setItem(this.authenticationKey, authenticationToken);
    } else {
      sessionStorage.setItem(this.authenticationKey, authenticationToken);
    }
  }
    storeCompanySelection(selCompany: string,selDivision:string,selBranch:string): void
    {
      sessionStorage.setItem(this.companyKey, selCompany);
      sessionStorage.setItem(this.branchKey, selBranch);
      sessionStorage.setItem(this.divisionKey, selDivision);
    }
  getAuthenticationToken(): string | null {
    const authenticationToken = localStorage.getItem(this.authenticationKey) ?? sessionStorage.getItem(this.authenticationKey);
    return authenticationToken ? (JSON.parse(authenticationToken) as string | null) : authenticationToken;
  }

  clearAuthenticationToken(): void {
    sessionStorage.removeItem(this.authenticationKey);
    localStorage.removeItem(this.authenticationKey);
  }
}
