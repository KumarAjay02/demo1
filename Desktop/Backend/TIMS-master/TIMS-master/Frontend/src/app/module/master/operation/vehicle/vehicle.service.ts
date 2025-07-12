// vehicle.service.ts
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IVehicle } from './model/vehicle.model';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private vehicles: IVehicle[] = [];

  getVehicles(): Observable<IVehicle[]> {
    return of(this.vehicles);
  }

  getVehicleById(id: number): Observable<IVehicle | undefined> {
    return of(this.vehicles.find(vehicle => vehicle.id === id));
  }

  updateVehicle(vehicle: IVehicle): Observable<IVehicle> {
    const index = this.vehicles.findIndex(v => v.id === vehicle.id);
    if (index !== -1) {
      this.vehicles[index] = vehicle;
    } else {
      vehicle.id = this.vehicles.length + 1;
      this.vehicles.push(vehicle);
    }
    return of(vehicle);
  }

  delete(id: number): Observable<HttpResponse<any>> {
    this.vehicles = this.vehicles.filter(v => v.id !== id);
    return of(new HttpResponse({ status: 200 }));
  }
}
