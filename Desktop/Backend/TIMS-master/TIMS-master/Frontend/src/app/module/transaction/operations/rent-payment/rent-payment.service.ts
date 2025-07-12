import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
import { IRentPayment, IRentPaymentSearch } from './model/rent-payment.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RentPaymentService {
  private apiUrl = environment.apiUrl + '/api/rent-payments';
  private payments: IRentPayment[] = [];

  constructor(private http: HttpClient) {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    this.payments = [
      {
        id: 1,
        paymentNumber: 'RP-2023-001',
        paymentDate: '2023-05-15',
        payMode: 'Bank',
        bankOrCash: 'HDFC Bank',
        payType: 'NEFT',
        accountNo: '1234567890',
        chequeNo: '',
        chequeDate: '',
        finalAmount: 50000,
        payRemarks: 'Monthly rent payment',
        createdDate: new Date(),
        createdBy: 'admin'
      }
    ];
  }

  getPayments(): Observable<IRentPayment[]> {
    return of(this.payments);
  }

  getPaymentById(id: number): Observable<IRentPayment | undefined> {
    return of(this.payments.find(p => p.id === id));
  }

  createPayment(payment: IRentPayment): Observable<IRentPayment> {
    const newPayment = { ...payment, id: this.generateId(), createdDate: new Date() };
    this.payments.push(newPayment);
    return of(newPayment);
  }

  updatePayment(payment: IRentPayment): Observable<IRentPayment> {
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

  searchPayments(criteria: IRentPaymentSearch): Observable<IRentPayment[]> {
    return of(this.payments.filter(p => {
      const matchesPaymentNumber = !criteria.paymentNumber ||
        p.paymentNumber?.includes(criteria.paymentNumber);
      const matchesFromDate = !criteria.fromDate ||
        (p.paymentDate && p.paymentDate >= criteria.fromDate);
      const matchesToDate = !criteria.toDate ||
        (p.paymentDate && p.paymentDate <= criteria.toDate);
      return matchesPaymentNumber && matchesFromDate && matchesToDate;
    }));
  }

  private generateId(): number {
    return this.payments.length > 0 ?
      Math.max(...this.payments.map(p => p.id || 0)) + 1 : 1;
  }
}
