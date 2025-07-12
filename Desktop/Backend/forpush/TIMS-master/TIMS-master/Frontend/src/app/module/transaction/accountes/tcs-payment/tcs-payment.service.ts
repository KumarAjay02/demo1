import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
import { ITcsPayment, ITcsPaymentSearch } from './model/tcs-payment.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TcsPaymentService {
  private apiUrl = environment.apiUrl + '/api/tcs-payments';
  private payments: ITcsPayment[] = [];

  constructor(private http: HttpClient) {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    this.payments = [
      {
        id: 1,
        fromDate: '2021-02-09',
        toDate: '2021-05-20',
        branchCode: 'DHRT - DHARMHERA HUB',
        supplier: 'IMAT1>SAMOVIAN CARGO MONER',
        mode: 'BLANK',
        bankDetails: '10067M-GCCI_BANK-6021036217900',
        payType: 'NEFT',
        ietNumber: '00',
        neftDate: '2025-05-20',
        narration: '',
        createdDate: new Date(),
        createdBy: 'admin'
      }
    ];
  }

  getPayments(): Observable<ITcsPayment[]> {
    return of(this.payments);
  }

  getPaymentById(id: number): Observable<ITcsPayment | undefined> {
    return of(this.payments.find(p => p.id === id));
  }

  createPayment(payment: ITcsPayment): Observable<ITcsPayment> {
    const newPayment = { ...payment, id: this.generateId(), createdDate: new Date() };
    this.payments.push(newPayment);
    return of(newPayment);
  }

  updatePayment(payment: ITcsPayment): Observable<ITcsPayment> {
    const index = this.payments.findIndex(p => p.id === payment.id);
    if (index !== -1) {
      this.payments[index] = payment;
    }
    return of(payment);
  }

  deletePayment(id: number): Observable<any> {
    this.payments = this.payments.filter(p => p.id !== id);
    return of({ success: true });
  }

  searchPayments(criteria: ITcsPaymentSearch): Observable<ITcsPayment[]> {
    return of(this.payments.filter(p => {
      const matchesFromDate = !criteria.fromDate || p.fromDate >= criteria.fromDate;
      const matchesToDate = !criteria.toDate || p.toDate <= criteria.toDate;
      const matchesBranch = !criteria.branchCode ||
        p.branchCode?.toLowerCase().includes(criteria.branchCode.toLowerCase());
      const matchesSupplier = !criteria.supplier ||
        p.supplier?.toLowerCase().includes(criteria.supplier.toLowerCase());
      return matchesFromDate && matchesToDate && matchesBranch && matchesSupplier;
    }));
  }

  private generateId(): number {
    return this.payments.length > 0 ?
      Math.max(...this.payments.map(p => p.id || 0)) + 1 : 1;
  }
}
