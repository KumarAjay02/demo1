
// model/voucherentry.model.ts
export interface IVoucherEntry {
  ID?: number;
  FINANCIAL_YEAR?: number;
  BRANCH_CODE?: string;
  DOC_TYPE?: string;
  DOC_NO?: number;
  DOC_DATE?: string;
  PAY_MODE?: string;
  PAID_RECEIVED_FROM?: string;
  PAY_TYPE?: string;
  CHEQUE_NO?: string;
  CHEQUE_DATE?: string;
  BANK_ACCOUNT_NO?: string;
  PAN_NO?: string;
  TSD_TYPE?: string;
  GL_CODE?: string;
  COST_CODE?: string;
  COST_CENTER?: string;
  CGST?: number;
  SGST?: number;
  IGST?: number;
  INVNO?: string;
  AMOUNT?: number;
  NARRATION?: string;
  createdBy?: string;
  createdDate?: Date;
  modifiedBy?: string;
  modifiedDate?: Date;
}

export class VoucherEntry implements IVoucherEntry {
  constructor(
    public ID?: number,
    public FINANCIAL_YEAR?: number,
    public BRANCH_CODE?: string,
    public DOC_TYPE?: string,
    public DOC_NO?: number,
    public DOC_DATE?: string,
    public PAY_MODE?: string,
    public PAID_RECEIVED_FROM?: string,
    public PAY_TYPE?: string,
    public CHEQUE_NO?: string,
    public CHEQUE_DATE?: string,
    public BANK_ACCOUNT_NO?: string,
    public PAN_NO?: string,
    public TSD_TYPE?: string,
    public GL_CODE?: string,
    public COST_CODE?: string,
    public COST_CENTER?: string,
    public CGST?: number,
    public SGST?: number,
    public IGST?: number,
    public INVNO?: string,
    public AMOUNT?: number,
    public NARRATION?: string,
    public createdBy?: string,
    public createdDate?: Date,
    public modifiedBy?: string,
    public modifiedDate?: Date
  ) { }
}


export interface IVoucherEntrySearch {
  FINANCIAL_YEAR?: number;
  BRANCH_CODE?: string;
  DOC_TYPE?: string;
  DOC_NO?: number;
  fromDate?: string;
  toDate?: string;
}

export class VoucherEntrySearch implements IVoucherEntrySearch {
  constructor(
    public FINANCIAL_YEAR?: number,
    public BRANCH_CODE?: string,
    public DOC_TYPE?: string,
    public DOC_NO?: number,
    public fromDate?: string,
    public toDate?: string,
  ) { }
}
