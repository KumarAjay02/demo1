import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IContraVoucher } from './model/contra-voucher.module';
import { IContraVoucherSearch } from './model/contra-voucher-search.module';

@Injectable({
  providedIn: 'root'
})
export class contraVoucherService {

  private contraVouchers: IContraVoucher[] = [
    {
      ID: 1,
      FINANCIAL_YEAR: 2425,
      BRANCH_CODE: 'GGCO',
      DOC_TYPE: 'GLCW',
      DOC_NO: 1,
      DOC_DATE: '2020-02-01',
      PAY_TYPE: 'NEFT',
      CHEQUE_NO: '888888',
      CHEQUE_DATE: '2020-02-01',
      DEBIT_ACCOUNT_NO: '5000',
      CREDIT_ACCOUNT_NO: '',
      AMOUNT: 100,
      NARRATION: 'NARRATION'
    },
  ];

  getContraVoucher(): Observable<IContraVoucher[]> {
    return of(this.contraVouchers);
  }

  getContraVoucherById(id: any): Observable<IContraVoucher | undefined> {
    return of(this.contraVouchers.find(b => b.ID === id));
  }

  updateContraVoucher(updatedContraV: IContraVoucher): Observable<IContraVoucher> {
    const index = this.contraVouchers.findIndex(b => b.ID === updatedContraV.ID);
    if (index !== -1) {
      this.contraVouchers[index] = updatedContraV;
    }
    return of(updatedContraV);
  }

  delete(id: number): Observable<HttpResponse<any>> {
    this.contraVouchers = this.contraVouchers.filter(b => b.ID !== id);
    return of(new HttpResponse({ status: 200 }));
  }

  search(srch: IContraVoucherSearch): Observable<IContraVoucher[]> {
    return of(this.contraVouchers.filter(p =>
      (!srch.FINANCIAL_YEAR || p.FINANCIAL_YEAR?.toFixed(srch.FINANCIAL_YEAR)) &&
      (!srch.BRANCH_CODE || p.BRANCH_CODE?.toLowerCase().includes(srch.BRANCH_CODE.toLowerCase())) &&
      (!srch.DOC_TYPE || p.DOC_TYPE?.toLowerCase().includes(srch.DOC_TYPE.toLowerCase())) &&
      (!srch.DOC_NO || p.DOC_NO?.toFixed().includes(srch.DOC_NO.toFixed())) 
    ));
  }

}
