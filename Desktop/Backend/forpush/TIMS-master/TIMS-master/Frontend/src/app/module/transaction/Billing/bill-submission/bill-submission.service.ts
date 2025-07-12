// bill-submission.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IBillSubmission, IBillSubmissionSearch } from './model/bill-submission.model';

@Injectable({ providedIn: 'root' })
export class BillSubmissionService {
  private apiUrl = environment.apiUrl + '/api/bill-submissions';
  private submissions: IBillSubmission[] = [];

  constructor(private http: HttpClient) {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    this.submissions = [
      {
        id: 1,
        billBranch: 'PINBO - FUNE RE',
        customerCodeName: 'JAVASHREE POLYMERS PVT LIMIT',
        groupInvoiceNo: '2427315081',
        groupInvoiceDate: '2025-02-28',
        invoiceType: 'R',
        createdDate: new Date(),
        createdBy: 'admin'
      }
    ];
  }

  getSubmissions(): Observable<IBillSubmission[]> {
    // In real app: return this.http.get<IBillSubmission[]>(this.apiUrl);
    return of(this.submissions);
  }

  getSubmissionById(id: number): Observable<IBillSubmission | undefined> {
    // In real app: return this.http.get<IBillSubmission>(`${this.apiUrl}/${id}`);
    return of(this.submissions.find(sub => sub.id === id));
  }

  createSubmission(submission: IBillSubmission): Observable<IBillSubmission> {
    // In real app: return this.http.post<IBillSubmission>(this.apiUrl, submission);
    const newSubmission = { ...submission, id: this.generateId(), createdDate: new Date() };
    this.submissions.push(newSubmission);
    return of(newSubmission);
  }

  updateSubmission(submission: IBillSubmission): Observable<IBillSubmission> {
    // In real app: return this.http.put<IBillSubmission>(`${this.apiUrl}/${submission.id}`, submission);
    const index = this.submissions.findIndex(s => s.id === submission.id);
    if (index !== -1) {
      this.submissions[index] = submission;
    }
    return of(submission);
  }

  deleteSubmission(id: number): Observable<any> {
    // In real app: return this.http.delete(`${this.apiUrl}/${id}`);
    this.submissions = this.submissions.filter(sub => sub.id !== id);
    return of({ success: true });
  }

  searchSubmissions(criteria: IBillSubmissionSearch): Observable<IBillSubmission[]> {
    // In real app: return this.http.post<IBillSubmission[]>(`${this.apiUrl}/search`, criteria);
    return of(this.submissions.filter(sub => {
      const matchesGroupInvoice = !criteria.groupInvoiceNo ||
        sub.groupInvoiceNo?.includes(criteria.groupInvoiceNo);
      const matchesCustomer = !criteria.customerCodeName ||
        sub.customerCodeName?.toLowerCase().includes(criteria.customerCodeName.toLowerCase());
      return matchesGroupInvoice && matchesCustomer;
    }));
  }

  private generateId(): number {
    return this.submissions.length > 0 ?
      Math.max(...this.submissions.map(s => s.id || 0)) + 1 : 1;
  }
}
