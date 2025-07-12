import {ICustomerBranch} from './customer-branch.model';

export interface ICustomer {
  coCode?: string;
  divCode?: string;
  customerCode?: number;
  customerName?: string;
  type?: string;
  website?: string;
  isActive?: string;
  billPartyStatus?: string;
  regStatus?: string;
  cft?: number;
  fcmFlag?: string;
  outstandingMailFlag?: string;
  creditDays?: number;
  billingBase?: string;
  oemFlag?: string;
  creditDaysAir?: number;
  creditDaysTrain?: number;
  cPaymentType?: string;
  eInvoiceMail?: string;
  billBranch?: string;
  tempCustomer?: string;
  panNo?: string;
  taxApplicable?: string;
  createdBy?: string;
  createdOn?: Date;
  modifiedBy?: string;
  modifiedOn?: Date;
  customerDets?: ICustomerBranch[];
  suntekCode?: string;
  tradeName?: string;
}

export class Customer implements ICustomer {
  constructor(
    public coCode?: string,
    public divCode?: string,
    public customerCode?: number,
    public customerName?: string,
    public type?: string,
    public website?: string,
    public isActive?: string,
    public billPartyStatus?: string,
    public regStatus?: string,
    public cft?: number,
    public fcmFlag?: string,
    public outstandingMailFlag?: string,
    public creditDays?: number,
    public billingBase?: string,
    public oemFlag?: string,
    public creditDaysAir?: number,
    public creditDaysTrain?: number,
    public cPaymentType?: string,
    public eInvoiceMail?: string,
    public billBranch?: string,
    public tempCustomer?: string,
    public panNo?: string,
    public taxApplicable?: string,
    public createdBy?: string,
    public createdOn?: Date,
    public modifiedBy?: string,
    public modifiedOn?: Date,
    public customerDets?: ICustomerBranch[],
    public suntekCode?: string,
    public tradeName?: string

  ) {}
}
