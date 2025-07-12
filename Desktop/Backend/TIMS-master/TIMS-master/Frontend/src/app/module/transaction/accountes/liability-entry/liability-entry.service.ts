import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
import { ILiabilityEntry, ILiabilityEntrySearch } from './model/liability-entry.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LiabilityEntryService {
  private apiUrl = environment.apiUrl + '/api/liability-entries';
  private entries: ILiabilityEntry[] = [];

  constructor(private http: HttpClient) {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    this.entries = [
      {
        id: 1,
        financialYear: '2024-2025',
        billType: 'Service',
        billDate: '2025-05-20',
        supplier: '104257>ROUBE PRINTMART PVT LTI',
        companyType: 'NA - X - 0',
        liabilityType: 'MANUAL LIABILITY INVOICE',
        liabilityDate: '2025-05-20',
        liabilityDueDate: '',
        createdDate: new Date(),
        createdBy: 'admin'
      }
    ];
  }

  getEntries(): Observable<ILiabilityEntry[]> {
    return of(this.entries);
  }

  getEntryById(id: number): Observable<ILiabilityEntry | undefined> {
    return of(this.entries.find(e => e.id === id));
  }

  createEntry(entry: ILiabilityEntry): Observable<ILiabilityEntry> {
    const newEntry = { ...entry, id: this.generateId(), createdDate: new Date() };
    this.entries.push(newEntry);
    return of(newEntry);
  }

  updateEntry(entry: ILiabilityEntry): Observable<ILiabilityEntry> {
    const index = this.entries.findIndex(e => e.id === entry.id);
    if (index !== -1) {
      this.entries[index] = entry;
    }
    return of(entry);
  }

  deleteEntry(id: number): Observable<any> {
    this.entries = this.entries.filter(e => e.id !== id);
    return of({ success: true });
  }

  searchEntries(criteria: ILiabilityEntrySearch): Observable<ILiabilityEntry[]> {
    return of(this.entries.filter(e => {
      const matchesBillNumber = !criteria.billNumber ||
        e.billNumber?.includes(criteria.billNumber);
      const matchesSupplier = !criteria.supplier ||
        e.supplier?.toLowerCase().includes(criteria.supplier.toLowerCase());
      const matchesLiabilityType = !criteria.liabilityType ||
        e.liabilityType?.toLowerCase().includes(criteria.liabilityType.toLowerCase());
      return matchesBillNumber && matchesSupplier && matchesLiabilityType;
    }));
  }

  private generateId(): number {
    return this.entries.length > 0 ?
      Math.max(...this.entries.map(e => e.id || 0)) + 1 : 1;
  }
}
