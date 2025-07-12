// road-tcs.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRoadTcs } from './model/road-tcs.model';
import { IRoadTcsSearch } from './model/road-tcs-search.model';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
 

@Injectable({ providedIn: 'root' })
export class RoadTcsService {
  private roadTcsList: IRoadTcs[] = [];
  private apiUrl = environment.apiUrl + '/api/road-tcs';

  constructor(private http: HttpClient) { }

  getRoadTcsList(): Observable<IRoadTcs[]> {
    return of(this.roadTcsList);
    // Replace with actual HTTP call when backend ready
    // return this.http.get<IRoadTcs[]>(this.apiUrl);
  }

  getRoadTcsById(id: number): Observable<IRoadTcs | undefined> {
    return of(this.roadTcsList.find(r => r.id === id));
  }

  create(roadTcs: IRoadTcs): Observable<IRoadTcs> {
    roadTcs.id = this.roadTcsList.length + 1;
    this.roadTcsList.push(roadTcs);
    return of(roadTcs);
  }

  update(roadTcs: IRoadTcs): Observable<IRoadTcs> {
    const index = this.roadTcsList.findIndex(r => r.id === roadTcs.id);
    if (index !== -1) {
      this.roadTcsList[index] = roadTcs;
    }
    return of(roadTcs);
  }

  delete(id: number): Observable<any> {
    this.roadTcsList = this.roadTcsList.filter(r => r.id !== id);
    return of({ status: 200 });
  }

  search(criteria: IRoadTcsSearch): Observable<IRoadTcs[]> {
    // Fake local filtering (replace with HTTP POST later)
    return of(this.roadTcsList.filter(r =>
      (!criteria.vehicleNumber || r.vehicleNumber?.toLowerCase().includes(criteria.vehicleNumber.toLowerCase())) &&
      (!criteria.driverName || r.driverName?.toLowerCase().includes(criteria.driverName.toLowerCase()))
    ));
  }
}
