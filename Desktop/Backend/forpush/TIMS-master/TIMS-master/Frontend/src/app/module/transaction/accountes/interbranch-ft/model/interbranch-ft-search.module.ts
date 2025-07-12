// model/interbranch-ft.search.model.ts
export interface IInterBranchFundTransferSearch {
  FINANCIAL_YEAR?: number;
  BRANCH_CODE?: string;
  DOC_TYPE?: string;
  DOC_NO?: number;
  DOC_DATE?: string;
}

export class InterBranchFundTransferSearch implements IInterBranchFundTransferSearch {
  constructor(
    public FINANCIAL_YEAR?: number,
    public BRANCH_CODE?: string,
    public DOC_TYPE?: string,
    public DOC_NO?: number,
    public DOC_DATE?: string,
  ) { }
}
