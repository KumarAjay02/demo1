import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
import { IRentLiabilityApproval, IRentLiabilityApprovalSearch } from './model/rent-liability-approval.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RentLiabilityApprovalService {
  private apiUrl = environment.apiUrl + '/api/rent-liability-approvals';
  private approvals: IRentLiabilityApproval[] = [];

  constructor(private http: HttpClient) {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    this.approvals = [
      {
        id: 1,
        branchCode: 'ALL',
        financialYear: '2526',
        fromDate: '2025-05-01',
        toDate: '2025-05-22',
        approvalNumber: 'RLA-2025-001',
        approvalDate: '2025-05-15',
        status: 'Pending',
        createdDate: new Date(),
        createdBy: 'admin'
      }
    ];
  }

  getApprovals(): Observable<IRentLiabilityApproval[]> {
    return of(this.approvals);
  }

  getApprovalById(id: number): Observable<IRentLiabilityApproval | undefined> {
    return of(this.approvals.find(a => a.id === id));
  }

  createApproval(approval: IRentLiabilityApproval): Observable<IRentLiabilityApproval> {
    const newApproval = { ...approval, id: this.generateId(), createdDate: new Date() };
    this.approvals.push(newApproval);
    return of(newApproval);
  }

  updateApproval(approval: IRentLiabilityApproval): Observable<IRentLiabilityApproval> {
    const index = this.approvals.findIndex(a => a.id === approval.id);
    if (index !== -1) {
      this.approvals[index] = approval;
    }
    return of(approval);
  }

  deleteApproval(id: number): Observable<any> {
    this.approvals = this.approvals.filter(a => a.id !== id);
    return of({ success: true });
  }

  searchApprovals(criteria: IRentLiabilityApprovalSearch): Observable<IRentLiabilityApproval[]> {
    return of(this.approvals.filter(a => {
      const matchesApprovalNumber = !criteria.approvalNumber ||
        a.approvalNumber?.includes(criteria.approvalNumber);
      const matchesApprovalDate = !criteria.approvalDate ||
        a.approvalDate === criteria.approvalDate;
      return matchesApprovalNumber && matchesApprovalDate;
    }));
  }

  private generateId(): number {
    return this.approvals.length > 0 ?
      Math.max(...this.approvals.map(a => a.id || 0)) + 1 : 1;
  }
}
