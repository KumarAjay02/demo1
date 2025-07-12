
// model/journalvoucher.model.ts
export interface IJournalVoucher {
  ID?: number;
  FINANCIAL_YEAR?: number;
  BRANCH_CODE?: string;
  DOC_TYPE?: string;
  DOC_NO?: number;
  DOC_DATE?: string;
  NARRATION?: string;
  ReversEntry?: string;
  createdBy?: string;
  createdDate?: Date;
  modifiedBy?: string;
  modifiedDate?: Date;
}

export class JournalVoucher implements IJournalVoucher {
  constructor(
    public ID?: number,
    public FINANCIAL_YEAR?: number,
    public BRANCH_CODE?: string,
    public DOC_TYPE?: string,
    public DOC_NO?: number,
    public DOC_DATE?: string,
    public NARRATION?: string,
    public ReversEntry?:string,
    public createdBy?: string,
    public createdDate?: Date,
    public modifiedBy?: string,
    public modifiedDate?: Date
  ) { }
}

export interface IJournalVoucherDtls {
  ID?: number;
  JV_ID?: number;
  ACCOUNT_CODE?: string;
  COST_CODE?: string;
  DOC_REF?: string;
  DEBIT_AMOUNT?: number;
  CREDIT_AMOUNT?: number;
  createdBy?: string;
  createdDate?: Date;
  modifiedBy?: string;
  modifiedDate?: Date;
}

export class JournalVoucherDtls implements IJournalVoucherDtls {
  constructor(
    public ID?: number,
    public JV_ID?: number,
    public ACCOUNT_CODE?: string,
    public COST_CODE?: string,
    public DOC_REF?: string,
    public DEBIT_AMOUNT?: number,
    public CREDIT_AMOUNT?: number,
    public createdBy?: string,
    public createdDate?: Date,
    public modifiedBy?: string,
    public modifiedDate?: Date
  ) { }
}

export interface IJournalVoucherSearch {
  FINANCIAL_YEAR?: number;
  BRANCH_CODE?: string;
  DOC_TYPE?: string;
  DOC_NO?: number;
  fromDate?: string;
  toDate?: string;
}

export class JournalVoucherSearch implements IJournalVoucherSearch {
  constructor(
    public FINANCIAL_YEAR?: number,
    public BRANCH_CODE?: string,
    public DOC_TYPE?: string,
    public DOC_NO?: number,
    public fromDate?: string,
    public toDate?: string,
  ) { }
}
