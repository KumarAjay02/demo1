import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
import { IRentAgreement, IRentAgreementSearch } from './model/rent-agreement.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RentAgreementService {
  private apiUrl = environment.apiUrl + '/api/rent-agreements';
  private agreements: IRentAgreement[] = [];

  constructor(private http: HttpClient) {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    this.agreements = [
      {
        id: 1,
        financialYear: '2024-2025',
        supplierName: 'ABC Suppliers',
        status: 'Yes',
        agreementFromDate: '2024-01-01',
        agreementToDate: '2025-12-31',
        rentType: 'Warehouse',
        areaSqft: 5000,
        noticePeriod: '3 months',
        lockingPeriod: '1 year',
        monthlyRentAmount: 50000,
        advanceAmount: 100000,
        securityDeposit: 200000,
        tdsPercentage: 10,
        gstPercentage: 18,
        rcm: 'No',
        electricityUnitRate: 8.5,
        panNo: 'ABCDE1234F',
        gstNo: '22ABCDE1234F1Z5',
        address: '123 Main St, City',
        agreementNumber: 'RA-2024-001',
        createdDate: new Date(),
        createdBy: 'admin'
      }
    ];
  }

  getAgreements(): Observable<IRentAgreement[]> {
    return of(this.agreements);
  }

  getAgreementById(id: number): Observable<IRentAgreement | undefined> {
    return of(this.agreements.find(a => a.id === id));
  }

  createAgreement(agreement: IRentAgreement): Observable<IRentAgreement> {
    const newAgreement = { ...agreement, id: this.generateId(), createdDate: new Date() };
    this.agreements.push(newAgreement);
    return of(newAgreement);
  }

  updateAgreement(agreement: IRentAgreement): Observable<IRentAgreement> {
    const index = this.agreements.findIndex(a => a.id === agreement.id);
    if (index !== -1) {
      this.agreements[index] = agreement;
    }
    return of(agreement);
  }

  deleteAgreement(id: number): Observable<any> {
    this.agreements = this.agreements.filter(a => a.id !== id);
    return of({ success: true });
  }

  searchAgreements(criteria: IRentAgreementSearch): Observable<IRentAgreement[]> {
    return of(this.agreements.filter(a => {
      const matchesAgreementNumber = !criteria.agreementNumber ||
        a.agreementNumber?.includes(criteria.agreementNumber);
      const matchesRentType = !criteria.rentType ||
        a.rentType?.toLowerCase().includes(criteria.rentType.toLowerCase());
      const matchesAgreementDate = !criteria.agreementFromDate ||
        a.agreementFromDate === criteria.agreementFromDate;
      return matchesAgreementNumber && matchesRentType && matchesAgreementDate;
    }));
  }

  private generateId(): number {
    return this.agreements.length > 0 ?
      Math.max(...this.agreements.map(a => a.id || 0)) + 1 : 1;
  }
}
