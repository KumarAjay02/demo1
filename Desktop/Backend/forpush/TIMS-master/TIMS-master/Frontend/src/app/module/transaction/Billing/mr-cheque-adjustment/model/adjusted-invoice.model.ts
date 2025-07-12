// Interface
export interface IAdjustedInvoice {
  sNo: number;
  checkbox: boolean;
  invoiceNo: string;
  invoiceDate: string;
  supplierBranch:string;
  supplierName: string;
  invoiceType: string;
  billAmount: number;
  taxes: number;
  totalAmount: number;
  outStandingAmount: number;
  adjustedAmount: number;
  tdsAmount: number;
}

// Class
export class AdjustedInvoice implements IAdjustedInvoice {
  constructor(
    public sNo: number,
    public checkbox: boolean,
    public invoiceNo: string,
    public invoiceDate: string,
    public supplierBranch: string,
    public supplierName: string,
    public invoiceType: string,
    public billAmount: number,
    public taxes: number,
    public totalAmount: number,
    public outStandingAmount: number,
    public adjustedAmount: number,
    public tdsAmount: number,
  ) {}
}
