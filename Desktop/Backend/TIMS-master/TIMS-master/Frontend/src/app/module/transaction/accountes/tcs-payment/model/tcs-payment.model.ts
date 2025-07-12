export interface ITcsPayment {
  id?: number;
  fromDate?: string;
  toDate?: string;
  branchCode?: string;
  supplier?: string;
  mode?: string;
  bankDetails?: string;
  payType?: string;
  ietNumber?: string;
  neftDate?: string;
  narration?: string;
  createdDate?: Date;
  createdBy?: string;
  updatedDate?: Date;
  updatedBy?: string;
}

export interface ITcsPaymentSearch {
  fromDate?: string;
  toDate?: string;
  branchCode?: string;
  supplier?: string;
  paymentNumber?:number;
  neftNumber?: string;
}

export class TcsPayment implements ITcsPayment {
  constructor(
    public id?: number,
    public fromDate?: string,
    public toDate?: string,
    public branchCode?: string,
    public supplier?: string,
    public mode?: string,
    public bankDetails?: string,
    public payType?: string,
    public ietNumber?: string,
    public neftDate?: string,
    public narration?: string,
    public createdDate?: Date,
    public createdBy?: string,
    public updatedDate?: Date,
    public updatedBy?: string
  ) {}
}

export class TcsPaymentSearch implements ITcsPaymentSearch {
  constructor(
    public fromDate?: string,
    public toDate?: string,
    public branchCode?: string,
    public supplier?: string,
    public paymentNumber?:number,
    public neftNumber?: string,
  ) {}
}
