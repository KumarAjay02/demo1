import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IInterBranchFundTransfer } from './model/interbranch-ft.module';
import { IInterBranchFundTransferSearch } from './model/interbranch-ft-search.module';


@Injectable({
  providedIn: 'root'
})
export class InterBranchFundTransferService {

  private InterBranchFundTransfers: IInterBranchFundTransfer[] = [
    {
      ID: 1,
      FINANCIAL_YEAR: 2425,
      BRANCH_CODE: 'GGCO',
      DOC_TYPE: 'FNDTFR',
      DOC_NO: 605,
      DOC_DATE: '2024-12-13',
      PAY_TYPE: 'NEFT',
      CHEQUE_NO: '0000',
      CHEQUE_DATE: '2024-12-13',
      BANK_ACCOUNT_NO: '002105027900',
      NARRATION: 'BEING FUND TRANSFER FROM GGCO TO MYS ',
      FROM_BRANCH: 'GGCO',
      TO_BRANCH: 'MYS'
    },
    {
      ID: 2,
      FINANCIAL_YEAR: 2425,
      BRANCH_CODE: 'GGCO',
      DOC_TYPE: 'FNDTFR',
      DOC_NO: 602,
      DOC_DATE: '2024-12-13',
      PAY_TYPE: 'NEFT',
      CHEQUE_NO: '000',
      CHEQUE_DATE: '2024-12-13',
      BANK_ACCOUNT_NO: '002105027900',
      NARRATION: 'BEING FUND TRANSFER FROM GGCO TO BNG ',
      FROM_BRANCH: 'GGCO',
      TO_BRANCH: 'BNG'
    },
  ];

  getInterBranchFundTransfer(): Observable<IInterBranchFundTransfer[]> {
    return of(this.InterBranchFundTransfers);
  }

  getInterBranchFundTransferById(id: any): Observable<IInterBranchFundTransfer | undefined> {
    return of(this.InterBranchFundTransfers.find(b => b.ID === id));
  }

  updateInterBranchFundTransfer(updatedInterBranchFT: IInterBranchFundTransfer): Observable<IInterBranchFundTransfer> {
    const index = this.InterBranchFundTransfers.findIndex(b => b.ID === updatedInterBranchFT.ID);
    if (index !== -1) {
      this.InterBranchFundTransfers[index] = updatedInterBranchFT;
    }
    return of(updatedInterBranchFT);
  }

  delete(id: number): Observable<HttpResponse<any>> {
    this.InterBranchFundTransfers = this.InterBranchFundTransfers.filter(b => b.ID !== id);
    return of(new HttpResponse({ status: 200 }));
  }

  search(srch: IInterBranchFundTransferSearch): Observable<IInterBranchFundTransfer[]> {
    return of(this.InterBranchFundTransfers.filter(p =>
      (!srch.FINANCIAL_YEAR || p.FINANCIAL_YEAR?.toString().includes(srch.FINANCIAL_YEAR.toString())) &&
      (!srch.BRANCH_CODE || p.BRANCH_CODE?.toUpperCase().includes(srch.BRANCH_CODE.toUpperCase())) &&
      (!srch.DOC_TYPE || p.DOC_TYPE?.includes(srch.DOC_TYPE.toString())) &&
      (!srch.DOC_NO || p.DOC_NO?.toString().includes(srch.DOC_NO.toString())) 
    ));
  }

}
