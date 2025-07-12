import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IAccount } from './model/account.module';
import { IAccountSearch } from './model/account-search.module';


@Injectable({
  providedIn: 'root'
})
export class accountService {

  private acounts: IAccount[] = [
    { SERIAL_NO: 1, GL_ACCOUNT_NATURE: 1, GL_SCHEDULE: 101, GL_GROUP: 10101, GL_ACCOUNT_CODE: '10015O', GL_ACCOUNT_DESC: 'FUND TRANSFER', GL_ACCOUNT_TYPE: 'OTHERS', GL_TYPE: 'A', REQ_COST_REF: 'Y', REQ_DOC_REF: 'Y', REQ_PAID_TO: 'Y', REQ_RECEIVED_FROM: 'N', FUND_TRANSFER: 'N', CREDIT_ALLOWED: 'Y', DEBIT_ALLOWED: 'Y', REQREFNO: 'N', REQREFDATE: 'Y', GL_OPENING_DATE: '2017-05-03', USE_STATUS: 'Y', CLOSING_DATE: 'NULL', IsActive: true },
    { SERIAL_NO: 2, GL_ACCOUNT_NATURE: 1, GL_SCHEDULE: 101, GL_GROUP: 10101, GL_ACCOUNT_CODE: '10114O', GL_ACCOUNT_DESC: 'INTER BRANCH', GL_ACCOUNT_TYPE: 'OTHERS', GL_TYPE: 'A', REQ_COST_REF: 'Y', REQ_DOC_REF: 'Y', REQ_PAID_TO: 'Y', REQ_RECEIVED_FROM: 'N', FUND_TRANSFER: 'N', CREDIT_ALLOWED: 'Y', DEBIT_ALLOWED: 'Y', REQREFNO: 'N', REQREFDATE: 'Y', GL_OPENING_DATE: '2017-05-03', USE_STATUS: 'Y', CLOSING_DATE: 'NULL', IsActive: true },
    { SERIAL_NO: 3, GL_ACCOUNT_NATURE: 1, GL_SCHEDULE: 101, GL_GROUP: 10102, GL_ACCOUNT_CODE: '10072O', GL_ACCOUNT_DESC: 'FUND TRANSFER-P & L', GL_ACCOUNT_TYPE: 'OTHERS', GL_TYPE: 'A', REQ_COST_REF: 'Y', REQ_DOC_REF: 'Y', REQ_PAID_TO: 'Y', REQ_RECEIVED_FROM: 'N', FUND_TRANSFER: 'N', CREDIT_ALLOWED: 'Y', DEBIT_ALLOWED: 'Y', REQREFNO: 'N', REQREFDATE: 'Y', GL_OPENING_DATE: '2017-05-03', USE_STATUS: 'Y', CLOSING_DATE: 'NULL', IsActive: true },
  ];

  getAccount(): Observable<IAccount[]> {
    return of(this.acounts);
  }

  getAccountById(id: any): Observable<IAccount | undefined> {
    return of(this.acounts.find(b => b.SERIAL_NO === id));
  }

  updateAccount(updatedAccount: IAccount): Observable<IAccount> {
    const index = this.acounts.findIndex(b => b.SERIAL_NO === updatedAccount.SERIAL_NO);
    if (index !== -1) {
      this.acounts[index] = updatedAccount;
    }
    return of(updatedAccount);
  }

  delete(id: number): Observable<HttpResponse<any>> {
    this.acounts = this.acounts.filter(b => b.SERIAL_NO !== id);
    return of(new HttpResponse({ status: 200 }));
  }

  search(srch: IAccountSearch): Observable<IAccount[]> {
    return of(this.acounts.filter(p =>
      (!srch.GL_ACCOUNT_NATURE || p.GL_ACCOUNT_NATURE?.toFixed(srch.GL_ACCOUNT_NATURE)) &&
      (!srch.GL_SCHEDULE || p.GL_SCHEDULE?.toFixed(srch.GL_SCHEDULE)) &&
      (!srch.GL_GROUP || p.GL_GROUP?.toFixed(srch.GL_GROUP)) &&
      (!srch.GL_ACCOUNT_CODE || p.GL_ACCOUNT_CODE?.toLowerCase().includes(srch.GL_ACCOUNT_CODE.toLowerCase())) &&
      (!srch.GL_ACCOUNT_DESC || p.GL_ACCOUNT_DESC?.toLowerCase().includes(srch.GL_ACCOUNT_DESC.toLowerCase())) &&
      (!srch.GL_ACCOUNT_TYPE || p.GL_ACCOUNT_TYPE?.toLowerCase().includes(srch.GL_ACCOUNT_TYPE.toLowerCase()))
    ));
  }

}
