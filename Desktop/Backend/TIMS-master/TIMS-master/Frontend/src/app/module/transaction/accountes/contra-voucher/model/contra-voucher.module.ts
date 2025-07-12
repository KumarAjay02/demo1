
// model/ContraVoucher.model.ts
export interface IContraVoucher {
  ID?: number;
  FINANCIAL_YEAR?: number;
  BRANCH_CODE?: string;
  DOC_TYPE?: string;
  DOC_NO?: number;
  DOC_DATE?: string;
  PAY_TYPE?: string;
  CHEQUE_NO?: string;
  CHEQUE_DATE?: string;
  DEBIT_ACCOUNT_NO?: string;
  CREDIT_ACCOUNT_NO?: string;
  AMOUNT?: number;
  NARRATION?: string;
  createdBy?: string;
  createdDate?: Date;
  modifiedBy?: string;
  modifiedDate?: Date;
}

export class ContraVoucher implements IContraVoucher {
  constructor(
    public ID?: number,
    public FINANCIAL_YEAR?: number,
    public BRANCH_CODE?: string,
    public DOC_TYPE?: string,
    public DOC_NO?: number,
    public DOC_DATE?: string,
    public PAY_TYPE?: string,
    public CHEQUE_NO?: string,
    public CHEQUE_DATE?: string,
    public DEBIT_ACCOUNT_NO?: string,
    public CREDIT_ACCOUNT_NO?: string,
    public AMOUNT?: number,
    public NARRATION?: string,
    public createdBy?: string,
    public createdDate?: Date,
    public modifiedBy?: string,
    public modifiedDate?: Date
  ) { }
}
