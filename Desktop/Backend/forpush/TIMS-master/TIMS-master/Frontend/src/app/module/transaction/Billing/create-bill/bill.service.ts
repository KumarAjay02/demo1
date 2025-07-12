// bill.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IBill } from './model/bill.model';
import { IBillSearch } from './model/bill-search.model';

@Injectable({ providedIn: 'root' })
export class BillService {
  private apiUrl = environment.apiUrl + '/api/bills';
  private bills: IBill[] = [];

  constructor(private http: HttpClient) {
    // Initialize mock data
    this.initializeMockData();
  }

  private initializeMockData(): void {
    this.bills = [
      {
        id: 1,
        billNumber: 'BL-2025-001',
        billBranch: 'PNRO - PUNE REGIONAL OFFICE - 27ABE',
        serviceMode: 'ROAD - 996511',
        dwbBasis: 'TBB-TO BE £',
        podUpload: false,
        customerNameCode: '12323 - SFS GROUP INDIA PRIVATE LIMIT',
        taxesApplicable: 0,
        financialYear: '2526',
        dwbUpto: '2025-05-15',
        docketBy: 'Only Booking',
        searchDocket: '',
        status: 'Active',
        createdDate: new Date(),
        createdBy: 'admin'
      },
      // Add more mock bills as needed
    ];
  }

  getBillList(): Observable<IBill[]> {
    // In real app: return this.http.get<IBill[]>(this.apiUrl);
    return of(this.bills);
  }

  getBillById(id: number): Observable<IBill | undefined> {
    // In real app: return this.http.get<IBill>(`${this.apiUrl}/${id}`);
    return of(this.bills.find(bill => bill.id === id));
  }

  createBill(bill: IBill): Observable<IBill> {
    // In real app: return this.http.post<IBill>(this.apiUrl, bill);
    const newBill = { ...bill, id: this.generateId(), createdDate: new Date() };
    this.bills.push(newBill);
    return of(newBill);
  }

  updateBill(bill: IBill): Observable<IBill> {
    // In real app: return this.http.put<IBill>(`${this.apiUrl}/${bill.id}`, bill);
    const index = this.bills.findIndex(b => b.id === bill.id);
    if (index !== -1) {
      this.bills[index] = bill;
    }
    return of(bill);
  }

  deleteBill(id: number): Observable<any> {
    // In real app: return this.http.delete(`${this.apiUrl}/${id}`);
    this.bills = this.bills.filter(bill => bill.id !== id);
    return of({ success: true });
  }

  searchBills(criteria: IBillSearch): Observable<IBill[]> {
    // In real app: return this.http.post<IBill[]>(`${this.apiUrl}/search`, criteria);
    return of(this.bills.filter(bill => {
      const matchesBillNumber = !criteria.billNumber ||
        bill.billNumber?.toLowerCase().includes(criteria.billNumber.toLowerCase());
      const matchesServiceMode = !criteria.serviceMode ||
        bill.serviceMode?.toLowerCase().includes(criteria.serviceMode.toLowerCase());
      return matchesBillNumber && matchesServiceMode;
    }));
  }

  getBillBranches(): Observable<any[]> {
    return of([
      { code: 'PNRO', name: 'PUNE REGIONAL OFFICE - 27ABE' },
      { code: 'MUM', name: 'MUMBAI BRANCH - 27ABC' }
    ]);
  }

  getServiceModes(): Observable<any[]> {
    return of([
      { code: '996531', name: 'AIR - 996531' },
      { code: '996532', name: 'AIR_INTL - 996531' },
      { code: '996812', name: 'CARGO - 996812' },
      { code: '998599', name: 'OTHER SUPPORT SERVICES - 996512' },
      { code: '996799', name: 'OTHER TRANSPORT SERVICES - 996511' },
      { code: '998549', name: 'PACKAGING - 996512' },
      { code: '996511', name: 'ROAD - 996511' },
      { code: '996521', name: 'SEA - 996512' },
      { code: '996512', name: 'TRAIN - 996512' },
      { code: '996729', name: 'WAREHOUSE - 996512' }

    ]);
  }
  getServiceModeswp(): Observable<any[]> {
    return of([

      { code: '996729', name: 'WAREHOUSE - 996512' },
      { code: '998549', name: 'Packaging' }

    ]);
  }
  getFinancialYear(): Observable<any[]> {
    return of([
      { code: '2526', year: '25-26' },
      { code: '2627', year: '26-27' },
    ]);
  }
  getCustomer(): Observable<any[]> {
    return of([
      { code: '12323', name: 'SFS GROUP INDIA PRIVATE LIMITED' },
      { code: '7968', name: 'ADIENT INDIA PRIVATE LIMITED' },
    ]);
  }

  getDwbBasisOptions(): Observable<any[]> {
    return of([
      { code: 'BOD', name: 'BOD-BILL ON DELIVERY' },
      { code: 'TBB', name: 'TBB-TO BE BILLED' },
      { code: 'TPB', name: 'THIRD PARTY BILL' }
    ]);
  }

  private generateId(): number {
    return this.bills.length > 0 ?
      Math.max(...this.bills.map(bill => bill.id || 0)) + 1 : 1;
  }
}
