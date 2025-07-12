// model/payable-search.model.ts
export interface IPayableSearch {
  PayableName?: string;
  PanNo?: string;
  AccountNo?: string;
  branchGstNo?: string;
}

export class PayableSearch implements IPayableSearch {
  constructor(
    public PayableName?: string,
    public PanNo?: string,
    public AccountNo?: string,
    public branchGstNo?: string,
  ) { }
}
