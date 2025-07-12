// mr-cheque-entry.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
import { IMrChequeEntry, IMrChequeEntrySearch } from './model/mr-cheque-entry.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MrChequeEntryService {
  private apiUrl = environment.apiUrl + '/api/mr-cheque-entries';
  private entries: IMrChequeEntry[] = [];

  constructor(private http: HttpClient) {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    this.entries = [
      {
        id: 1,
        branchCode: 'BR001',
        customerNameCode: 'CUST001 - ABC Company',
        customerName: 'ABC Company',
        deduction: '',
        annotation: '',
        submissionDate: '2025-05-15',
        remarks: '',
        payMode: 'Cheque',
        bank: 'State Bank of India',
        payType: 'Account Payee',
        chequeDate: '2025-05-15',
        docketNo: 'DOC12345',
        amount: 10000.00,
        tdsReverseAmount: 0.00,
        status: 'Pending',
        createdDate: new Date(),
        createdBy: 'admin'
      }
    ];
  }

  getEntries(): Observable<IMrChequeEntry[]> {
    // In real app: return this.http.get<IMrChequeEntry[]>(this.apiUrl);
    return of(this.entries);
  }

  getEntryById(id: number): Observable<IMrChequeEntry | undefined> {
    // In real app: return this.http.get<IMrChequeEntry>(`${this.apiUrl}/${id}`);
    return of(this.entries.find(entry => entry.id === id));
  }

  createEntry(entry: IMrChequeEntry): Observable<IMrChequeEntry> {
    // In real app: return this.http.post<IMrChequeEntry>(this.apiUrl, entry);
    const newEntry = { ...entry, id: this.generateId(), createdDate: new Date() };
    this.entries.push(newEntry);
    return of(newEntry);
  }

  updateEntry(entry: IMrChequeEntry): Observable<IMrChequeEntry> {
    // In real app: return this.http.put<IMrChequeEntry>(`${this.apiUrl}/${entry.id}`, entry);
    const index = this.entries.findIndex(e => e.id === entry.id);
    if (index !== -1) {
      this.entries[index] = entry;
    }
    return of(entry);
  }

  deleteEntry(id: number): Observable<any> {
    // In real app: return this.http.delete(`${this.apiUrl}/${id}`);
    this.entries = this.entries.filter(entry => entry.id !== id);
    return of({ success: true });
  }

  searchEntries(criteria: IMrChequeEntrySearch): Observable<IMrChequeEntry[]> {
    // In real app: return this.http.post<IMrChequeEntry[]>(`${this.apiUrl}/search`, criteria);
    return of(this.entries.filter(entry => {
      const matchesEntryNumber = !criteria.entryNumber ||
        entry.id?.toString().includes(criteria.entryNumber);
      const matchesCustomer = !criteria.customerName ||
        entry.customerName?.toLowerCase().includes(criteria.customerName.toLowerCase());
      const matchesDateRange = (!criteria.fromDate || entry.submissionDate >= criteria.fromDate) &&
        (!criteria.toDate || entry.submissionDate <= criteria.toDate);
      return matchesEntryNumber && matchesCustomer && matchesDateRange;
    }));
  }

  private generateId(): number {
    return this.entries.length > 0 ?
      Math.max(...this.entries.map(e => e.id || 0)) + 1 : 1;
  }
}
