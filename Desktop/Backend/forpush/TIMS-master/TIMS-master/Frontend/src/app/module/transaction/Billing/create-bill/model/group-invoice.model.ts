// Interface
export interface IGroupInvoice {
  sNo: number;
  checkbox: boolean;
  groupInvoiceNo: string;
  invoiceDate: string;
  invoiceType: string;
  billAmount: number;
  taxes: number;
  totalAmount: number;
  submissionDate: string;
  remarks: string;
  mrnNo: string;
  uploadFile: string; // can be a file path or URL
}

// Class
export class GroupInvoice implements IGroupInvoice {
  constructor(
    public sNo: number,
    public checkbox: boolean,
    public groupInvoiceNo: string,
    public invoiceDate: string,
    public invoiceType: string,
    public billAmount: number,
    public taxes: number,
    public totalAmount: number,
    public submissionDate: string,
    public remarks: string,
    public mrnNo: string,
    public uploadFile: string
  ) {}
}
