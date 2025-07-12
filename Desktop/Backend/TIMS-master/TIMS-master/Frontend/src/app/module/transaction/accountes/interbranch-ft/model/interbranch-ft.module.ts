
// model/interbranch-ft.model.ts
export interface IInterBranchFundTransfer {
  ID?: number;
  FINANCIAL_YEAR?: number;
  BRANCH_CODE?: string;
  DOC_TYPE?: string;
  DOC_NO?: number;
  DOC_DATE?: string;
  PAY_TYPE?: string;
  CHEQUE_NO?: string;
  CHEQUE_DATE?: string;
  BANK_ACCOUNT_NO?: string;
  NARRATION?: string;
  FROM_BRANCH?: string;
  TO_BRANCH?: string;
  createdBy?: string;
  createdDate?: Date;
  modifiedBy?: string;
  modifiedDate?: Date;
}

export class InterBranchFundTransfer implements IInterBranchFundTransfer {
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
    public BANK_ACCOUNT_NO?: string,
    public NARRATION?: string,
    public FROM_BRANCH?: string,
    public TO_BRANCH?: string,
    public createdBy?: string,
    public createdDate?: Date,
    public modifiedBy?: string,
    public modifiedDate?: Date
  ) { }
}
