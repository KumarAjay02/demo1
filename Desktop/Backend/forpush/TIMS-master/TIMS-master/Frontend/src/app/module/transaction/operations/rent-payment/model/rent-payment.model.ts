export interface IRentPayment {
  id?: number;
  paymentNumber?: string;
  paymentDate?: string;
  payMode?: string;
  bankOrCash?: string;
  payType?: string;
  accountNo?: string;
  chequeNo?: string;
  chequeDate?: string;
  finalAmount?: number;
  payRemarks?: string;
  createdDate?: Date;
  createdBy?: string;
  updatedDate?: Date;
  updatedBy?: string;
}

export interface IRentPaymentSearch {
  paymentNumber?: string;
  fromDate?: string;
  toDate?: string;
}

export class RentPayment implements IRentPayment {
  constructor(
    public id?: number,
    public paymentNumber?: string,
    public paymentDate?: string,
    public payMode?: string,
    public bankOrCash?: string,
    public payType?: string,
    public accountNo?: string,
    public chequeNo?: string,
    public chequeDate?: string,
    public finalAmount?: number,
    public payRemarks?: string,
    public createdDate?: Date,
    public createdBy?: string,
    public updatedDate?: Date,
    public updatedBy?: string
  ) {}
}

export class RentPaymentSearch implements IRentPaymentSearch {
  constructor(
    public paymentNumber?: string,
    public fromDate?: string,
    public toDate?: string
  ) {}
}
