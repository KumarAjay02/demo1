import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IVoucherEntry, IVoucherEntrySearch } from './model/voucherentry.module';



@Injectable({
  providedIn: 'root'
})
export class voucherentryService {

  private VoucherEntries: IVoucherEntry[] = [
    {
      ID: 1,
      FINANCIAL_YEAR: 2425,
      BRANCH_CODE: 'GGCO',
      DOC_TYPE: 'RECVOU',
      DOC_NO: 0,
      DOC_DATE: '',
      PAY_MODE: 'CASH',
      PAID_RECEIVED_FROM: '0',
      PAY_TYPE: 'NEFT',
      CHEQUE_NO: '',
      CHEQUE_DATE: '',
      BANK_ACCOUNT_NO: '',
      PAN_NO: '',
      TSD_TYPE: '',
      GL_CODE: '',
      COST_CODE: '',
      COST_CENTER: '',
      CGST:0,
      SGST: 0,
      IGST: 0,
      INVNO: '',
      AMOUNT: 0,
      NARRATION: 'NARRATION'
    },
  ];

  getVoucherEntry(): Observable<IVoucherEntry[]> {
    return of(this.VoucherEntries);
  }

  getVoucherEntryById(id: any): Observable<IVoucherEntry | undefined> {
    return of(this.VoucherEntries.find(b => b.ID === id));
  }

  updateVoucherEntry(updatedInterBranchFT: IVoucherEntry): Observable<IVoucherEntry> {
    const index = this.VoucherEntries.findIndex(b => b.ID === updatedInterBranchFT.ID);
    if (index !== -1) {
      this.VoucherEntries[index] = updatedInterBranchFT;
    }
    return of(updatedInterBranchFT);
  }

  delete(id: number): Observable<HttpResponse<any>> {
    this.VoucherEntries = this.VoucherEntries.filter(b => b.ID !== id);
    return of(new HttpResponse({ status: 200 }));
  }

  search(srch: IVoucherEntrySearch): Observable<IVoucherEntry[]> {
    return of(this.VoucherEntries.filter(p =>
      (!srch.FINANCIAL_YEAR || p.FINANCIAL_YEAR?.toString().includes(srch.FINANCIAL_YEAR.toString())) &&
      (!srch.BRANCH_CODE || p.BRANCH_CODE?.toUpperCase().includes(srch.BRANCH_CODE.toUpperCase())) &&
      (!srch.DOC_TYPE || p.DOC_TYPE?.includes(srch.DOC_TYPE.toString())) &&
      (!srch.DOC_NO || p.DOC_NO?.toString().includes(srch.DOC_NO.toString())) &&
      (!srch.fromDate || p.DOC_DATE >= srch.fromDate) &&
      (!srch.toDate || p.DOC_DATE >= srch.toDate)
    ));
  }

}
