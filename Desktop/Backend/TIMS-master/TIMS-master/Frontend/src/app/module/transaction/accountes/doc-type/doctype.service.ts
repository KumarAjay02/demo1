import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IDocType } from './model/doctype.module';
import { IDocTypeSearch } from './model/doctype-search.module';

@Injectable({
  providedIn: 'root'
})
export class DoctypeService {

  private DocType: IDocType[] = [
    { Serial_No: 1, DOC_TYPE: 'LBINV', DOC_DETAILS: 'MANUAL LIABILITY INVOICE', DOC_CATG: 'LIABILITY', IsActive: true },
    { Serial_No: 2, DOC_TYPE: 'LBTCS', DOC_DETAILS: 'TCS LIABILITY', DOC_CATG: 'LIABILITY', IsActive: true },
    { Serial_No: 3, DOC_TYPE: 'LBSAL', DOC_DETAILS: 'SALARY LIABILITY', DOC_CATG: 'LIABILITY', IsActive: true },
    { Serial_No: 4, DOC_TYPE: 'LBRNT', DOC_DETAILS: 'RENT LIABILITY', DOC_CATG: 'LIABILITY', IsActive: true },
    { Serial_No: 5, DOC_TYPE: 'PPLIB', DOC_DETAILS: 'LIABILITY PREPAYMENT', DOC_CATG: 'PAYMENT', IsActive: true },
    { Serial_No: 6, DOC_TYPE: 'PPTCS', DOC_DETAILS: 'TCS PREPAYMENT', DOC_CATG: 'PAYMENT', IsActive: true },
    { Serial_No: 7, DOC_TYPE: 'PALIB', DOC_DETAILS: 'LIABILITY PAYMENT', DOC_CATG: 'PAYMENT', IsActive: true },
  ];

  getDocType(): Observable<IDocType[]> {
    return of(this.DocType);
  }

  getDocTypeById(id: any): Observable<IDocType | undefined> {
    return of(this.DocType.find(b => b.Serial_No === id));
  }

  updateDocType(updatedDoctype: IDocType): Observable<IDocType> {
    const index = this.DocType.findIndex(b => b.Serial_No === updatedDoctype.Serial_No);
    if (index !== -1) {
      this.DocType[index] = updatedDoctype;
    }
    return of(updatedDoctype);
  }

  delete(id: number): Observable<HttpResponse<any>> {
    this.DocType = this.DocType.filter(b => b.Serial_No !== id);
    return of(new HttpResponse({ status: 200 }));
  }

  search(srch: IDocTypeSearch): Observable<IDocType[]> {
    return of(this.DocType.filter(p =>
      (!srch.DOC_DETAILS || p.DOC_DETAILS?.toLowerCase().includes(srch.DOC_DETAILS.toLowerCase())) &&
      (!srch.DOC_CATG || p.DOC_CATG?.toLowerCase().includes(srch.DOC_CATG.toLowerCase())) &&
      (!srch.DOC_TYPE || p.DOC_TYPE?.toLowerCase().includes(srch.DOC_TYPE.toLowerCase())) 
    ));
  }

}
