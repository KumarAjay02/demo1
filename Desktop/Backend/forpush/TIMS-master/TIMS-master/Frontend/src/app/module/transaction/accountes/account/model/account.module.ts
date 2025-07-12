
// model/account.model.ts
export interface IAccount {
  SERIAL_NO?: number;
  GL_ACCOUNT_NATURE?: number;
  GL_SCHEDULE?: number;
  GL_GROUP?: number;
  GL_ACCOUNT_CODE?: string;
  GL_ACCOUNT_DESC?: string;
  GL_ACCOUNT_TYPE?: string;
  GL_TYPE?: string;
  REQ_COST_REF?: string;
  REQ_DOC_REF?: string;
  REQ_PAID_TO?: string;
  REQ_RECEIVED_FROM?: string;
  FUND_TRANSFER?: string;
  CREDIT_ALLOWED?: string;
  DEBIT_ALLOWED?: string;
  REQREFNO?: string;
  REQREFDATE?: string;
  GL_OPENING_DATE?: string;
  USE_STATUS?: string;
  CLOSING_DATE?: string;
  IsActive?: boolean;
  createdBy?: string;
  createdDate?: Date;
  modifiedBy?: string;
  modifiedDate?: Date;
}

export class Account implements IAccount {
  constructor(
    public SERIAL_NO?: number,
    public GL_ACCOUNT_NATURE?: number,
    public GL_SCHEDULE?: number,
    public GL_GROUP?: number,
    public GL_ACCOUNT_CODE?: string,
    public GL_ACCOUNT_DESC?: string,
    public GL_ACCOUNT_TYPE?: string,
    public GL_TYPE?: string,
    public REQ_COST_REF?: string,
    public REQ_DOC_REF?: string,
    public REQ_PAID_TO?: string,
    public REQ_RECEIVED_FROM?: string,
    public FUND_TRANSFER?: string,
    public CREDIT_ALLOWED?: string,
    public DEBIT_ALLOWED?: string,
    public REQREFNO?: string,
    public REQREFDATE?: string,
    public GL_OPENING_DATE?: string,
    public USE_STATUS?: string,
    public CLOSING_DATE?: string,
    public IsActive?: boolean,
    public createdBy?: string,
    public createdDate?: Date,
    public modifiedBy?: string,
    public modifiedDate?: Date
  ) { }
}
