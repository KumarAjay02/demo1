// model/account.search.model.ts
export interface IContraVoucherSearch {
  FINANCIAL_YEAR?: number;
  BRANCH_CODE?: string;
  DOC_TYPE?: string;
  DOC_NO?: number;
  DOC_DATE?: string;
}

export class ContraVoucherSearch implements IContraVoucherSearch {
  constructor(
    public FINANCIAL_YEAR?: number,
    public BRANCH_CODE?: string,
    public DOC_TYPE?: string,
    public DOC_NO?: number,
    public DOC_DATE?: string,
  ) { }
}
