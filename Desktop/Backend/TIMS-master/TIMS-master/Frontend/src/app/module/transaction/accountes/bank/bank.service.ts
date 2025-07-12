import { Injectable } from '@angular/core';
import { IBank } from './model/bank.module';
import { Observable, map, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private Bank: IBank[] = [
    {
      Id: 1,
      BRANCH_CODE: 'AMD',
      BANK_NAME: 'ICICI BANK',
      BANK_ACCOUNT_CODE: '10067M',
      BANK_ACCOUNT_NO: '244905000922',
      BANK_BRANCH_NAME: 'AHEMADABAD',
      IFSC_CODE: 'ICIC0003244',
      BANK_ADDRESS: 'AHEMADABAD GUJRAT',
      STATE: 'GUJARAT',
      CITY: 'AHMEDABAD',
      PINCODE: '380001',
      COUNTRY: 'INDIA',
      BANK_PHONE1: '8588884651',
      BANK_PHONE2: '',
      BANK_EMAIL: 'GEETA.BANSAL@SUNTEKAXPRESS.IN',
      CONTACT_PERSON_NAME: 'GEETA BANSAL',
      CONTACT_MOBILE: '8588884651',
      CONTACT_EMAIL: '',
      MANAGER_NAME: '',
      MANAGER_MOBILE: '',
      MANAGER_EMAIL: '',
      OPEN_DATE: '',
      CLOSE_DATE: '',
      CREDIT_LIMIT: '',
      GUARANTEE_AMOUNT: '',
      SIGNATORY_1: 'SUNIL SHARMA',
      SIGNATORY_2: 'GEETA BANSAL',
      SIGNATORY_3: '',
      SIGNATORY_4: '',
      SIGNATORY_5: '',
      JOINT_ACCOUNT: '',
      IsActive: true
    },
    {
      Id: 2,
      BRANCH_CODE: 'BNG',
      BANK_NAME: 'ICICI BANK',
      BANK_ACCOUNT_CODE: '10067M',
      BANK_ACCOUNT_NO: '244905000899',
      BANK_BRANCH_NAME: 'BANGALORE',
      IFSC_CODE: 'ICIC0000047',
      BANK_ADDRESS: 'BANGALAORE',
      STATE: 'KARNATAKA',
      CITY: 'BANGALORE',
      PINCODE: '560001',
      COUNTRY: 'INDIA',
      BANK_PHONE1: '8588884651',
      BANK_PHONE2: '',
      BANK_EMAIL: 'GEETA@AXPRESSLOGISTICS.COM',
      CONTACT_PERSON_NAME: '',
      CONTACT_MOBILE: '9108001484',
      CONTACT_EMAIL: '',
      MANAGER_NAME: '',
      MANAGER_MOBILE: '',
      MANAGER_EMAIL: '',
      OPEN_DATE: '',
      CLOSE_DATE: '',
      CREDIT_LIMIT: '',
      GUARANTEE_AMOUNT: '',
      SIGNATORY_1: 'SUNIL KHUSHIRAM SHARMA',
      SIGNATORY_2: '',
      SIGNATORY_3: '',
      SIGNATORY_4: '',
      SIGNATORY_5: '',
      JOINT_ACCOUNT: '',
      IsActive: true
    }
  ];

  getBank(): Observable<IBank[]> {
    return of(this.Bank);
  }

  getBankById(id: any): Observable<IBank | undefined> {
    return of(this.Bank.find(b => b.Id === id));
  }

  updateBank(updatedBank: IBank): Observable<IBank> {
    const index = this.Bank.findIndex(b => b.Id === updatedBank.Id);
    if (index !== -1) {
      this.Bank[index] = updatedBank;
    }
    return of(updatedBank);
  }

  delete(id: number): Observable<HttpResponse<any>> {
    this.Bank = this.Bank.filter(b => b.Id !== id);
    return of(new HttpResponse({ status: 200 }));
  }
}
