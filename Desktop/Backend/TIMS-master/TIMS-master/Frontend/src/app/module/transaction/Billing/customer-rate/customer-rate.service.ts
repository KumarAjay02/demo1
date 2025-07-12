import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CustomerRateService {
  private baseUrl = '/api/customer-rate';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  search(criteria: any) {
    return this.http.post<any[]>(`${this.baseUrl}/search`, criteria);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
