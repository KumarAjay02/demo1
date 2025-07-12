export interface IRentAgreement {
  branchCode?: string;
  ownerName?: string;
  rentId?: string;
  rentAmount?: number;
  tds?: number;
  cGST?: number;
  sGST?: number;
  iGST?: number;
  advance?:number;
  deduction?: number;
  security?:number;
  total?: number;
  invoiceNumber?: string;
  invoiceDate?: string;
  approved?: boolean;
}


export class RentAgreement implements IRentAgreement {
  constructor(
    public branchCode?: string,
    public ownerName?: string,
    public rentId?: string,
    public rentAmount?: number,
    public tds?: number,
    public cGST?: number,
    public sGST?: number,
    public iGST?: number,
    public advance?:number,
    public deduction?:number,
    public security?:number,
    public total?:number,
    public invoiceNumber?:string,
    public invoiceDate?:string,
    public approved?: boolean,

  ) {}
}

