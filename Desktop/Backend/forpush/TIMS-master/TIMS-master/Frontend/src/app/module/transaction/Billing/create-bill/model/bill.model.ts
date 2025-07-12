// model/bill.model.ts
export interface IBill {
  id?: number;
  billNumber?: string;
  billBranch?: string;
  serviceMode?: string;
  dwbBasis?: string;
  podUpload?: boolean;
  customerNameCode?: string;
  taxesApplicable?: number;
  financialYear?: string;
  dwbUpto?: string;
  docketBy?: string;
  searchDocket?: string;
  status?: string;
  createdDate?: Date;
  createdBy?: string;
  updatedDate?: Date;
  updatedBy?: string;
}

export class Bill implements IBill {
  constructor(
    public id?: number,
    public billNumber?: string,
    public billBranch?: string,
    public serviceMode?: string,
    public dwbBasis?: string,
    public podUpload: boolean = false,
    public customerNameCode?: string,
    public taxesApplicable: number = 0,
    public financialYear?: string,
    public dwbUpto?: string,
    public docketBy?: string,
    public searchDocket?: string,
    public status: string = 'Active',
    public createdDate?: Date,
    public createdBy?: string,
    public updatedDate?: Date,
    public updatedBy?: string
  ) {}
}
