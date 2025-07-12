import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IJournalVoucher, IJournalVoucherSearch } from './model/journalvoucher.module';



@Injectable({
  providedIn: 'root'
})
export class journalvoucherService {

  private JournalVouchers: IJournalVoucher[] = [
    {
      ID: 1,
      FINANCIAL_YEAR: 2425,
      BRANCH_CODE: 'GGCO',
      DOC_TYPE: 'JNLVOU',
      DOC_NO: 270,
      DOC_DATE: '2024-12-10',
      NARRATION: 'NARRATION',
      ReversEntry:'N'
    },
    {
      ID: 2,
      FINANCIAL_YEAR: 2425,
      BRANCH_CODE: 'GGCO',
      DOC_TYPE: 'JNLVOU',
      DOC_NO: 269,
      DOC_DATE: '2024-12-10',
      NARRATION: 'NARRATION 2',
      ReversEntry: 'N'
    },
  ];

  getJournalVoucher(): Observable<IJournalVoucher[]> {
    return of(this.JournalVouchers);
  }

  getJournalVoucherById(id: any): Observable<IJournalVoucher | undefined> {
    return of(this.JournalVouchers.find(b => b.ID === id));
  }

  updateJournalVoucher(updatedJournalVoucher: IJournalVoucher): Observable<IJournalVoucher> {
    const index = this.JournalVouchers.findIndex(b => b.ID === updatedJournalVoucher.ID);
    if (index !== -1) {
      this.JournalVouchers[index] = updatedJournalVoucher;
    }
    return of(updatedJournalVoucher);
  }

  delete(id: number): Observable<HttpResponse<any>> {
    this.JournalVouchers = this.JournalVouchers.filter(b => b.ID !== id);
    return of(new HttpResponse({ status: 200 }));
  }

  search(srch: IJournalVoucherSearch): Observable<IJournalVoucher[]> {
    return of(this.JournalVouchers.filter(p =>
      (!srch.FINANCIAL_YEAR || p.FINANCIAL_YEAR?.toString().includes(srch.FINANCIAL_YEAR.toString())) &&
      (!srch.BRANCH_CODE || p.BRANCH_CODE?.toUpperCase().includes(srch.BRANCH_CODE.toUpperCase())) &&
      (!srch.DOC_TYPE || p.DOC_TYPE?.includes(srch.DOC_TYPE.toString())) &&
      (!srch.DOC_NO || p.DOC_NO?.toString().includes(srch.DOC_NO.toString())) 
    ));
  }

}
