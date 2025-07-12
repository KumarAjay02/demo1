import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IMrTransferAdjustment, IMrTransferAdjustmentSearch } from './model/mr-transfer-adjustment.model';

@Injectable({ providedIn: 'root' })
export class MrTransferAdjustmentService {
  private apiUrl = environment.apiUrl + '/api/mr-cheque-adjustments';
  private adjustments: IMrTransferAdjustment[] = [];

  constructor(private http: HttpClient) {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    this.adjustments = [
      {
        id: 1,
        adjustmentNumber:'2024',
        adjustmentDate:'2025-05-26',
        branch: 'GSCO',
        mrNumber: '1001116',
        mrDate: '2022-06-01',
        paymentType: 'NEFT',
        balanceAmt: 45000,
        createdDate: new Date(),
        createdBy: 'admin'
      }
    ];
  }

  getAdjustments(): Observable<IMrTransferAdjustment[]> {
    return of(this.adjustments);
  }

  getAdjustmentById(id: number): Observable<IMrTransferAdjustment | undefined> {
    return of(this.adjustments.find(a => a.id === id));
  }

  createAdjustment(adjustment: IMrTransferAdjustment): Observable<IMrTransferAdjustment> {
    const newAdjustment = { ...adjustment, id: this.generateId(), createdDate: new Date() };
    this.adjustments.push(newAdjustment);
    return of(newAdjustment);
  }

  updateAdjustment(adjustment: IMrTransferAdjustment): Observable<IMrTransferAdjustment> {
    const index = this.adjustments.findIndex(a => a.id === adjustment.id);
    if (index !== -1) {
      this.adjustments[index] = adjustment;
    }
    return of(adjustment);
  }

  deleteAdjustment(id: number): Observable<any> {
    this.adjustments = this.adjustments.filter(a => a.id !== id);
    return of({ success: true });
  }

  searchAdjustments(criteria: IMrTransferAdjustmentSearch): Observable<IMrTransferAdjustment[]> {
    return of(this.adjustments.filter(a => {
      const matchesAdjustmentNumber = !criteria.adjustmentNumber ||
        a.adjustmentNumber?.includes(criteria.adjustmentNumber);
      const matchesMrNumber = !criteria.mrNumber ||
        a.mrNumber?.includes(criteria.mrNumber);
      const matchesAdjustmentDate = !criteria.adjustmentDate ||
        a.adjustmentDate === criteria.adjustmentDate;
      return matchesAdjustmentNumber && matchesMrNumber && matchesAdjustmentDate;
    }));
  }

  private generateId(): number {
    return this.adjustments.length > 0 ?
      Math.max(...this.adjustments.map(a => a.id || 0)) + 1 : 1;
  }
}
