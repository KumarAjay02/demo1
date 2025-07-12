export interface ILiabilityDetail {
  id?: number;
  accountCode?: string;
  costCenter?: string;
  baseAmount?: string;
  taxesApplicable?: string;
  cgst?: string;
  sgst?: string;
  igst?: string;
  total?: string;
  approved?: boolean;
}

export class LiabilityDetail implements ILiabilityDetail {
  constructor(
    public id?: number,
    public accountCode?: string,
    public costCenter?: string,
    public baseAmount?: string,
    public taxesApplicable?: string,
    public cgst?: string,
    public sgst?: string,
    public igst?: string,
    public total?: string,
    public approved?: boolean,
  ) {}
}
