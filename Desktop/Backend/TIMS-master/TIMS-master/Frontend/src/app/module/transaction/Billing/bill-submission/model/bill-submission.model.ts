// model/bill-submission.model.ts
export interface IBillSubmission {
  id?: number;
  groupInvoiceNo?: string,
  billBranch?: string;
  customerCodeName?: string;
  groupInvoiceDate?: string,
  invoiceType?: string;
  // billAmount?: number;
  // taxes?: number;
  // totalAmount?: number;
  // submissionDate?: string;
  // remarks?: string;
  // menNo?: string;
  // file?: File | null;
  // status?: string;
  createdDate?: Date;
  createdBy?: string;
  updatedDate?: Date;
  updatedBy?: string;
}

export interface IBillSubmissionSearch {
  groupInvoiceNo?: string;
  customerCodeName?: string;
  fromDate?: string;
  toDate?: string;
  status?: string;
}

export class BillSubmission implements IBillSubmission {
  constructor(
    public id?: number,
    public groupInvoiceNo?: string,
    public billBranch?: string,
    public customerCodeName?: string,
    public groupInvoiceDate?: string,
    public invoiceType?: string,
    // public billAmount: number = 0,
    // public taxes: number = 0,
    // public totalAmount: number = 0,
    // public submissionDate?: string,
    // public remarks?: string,
    // public menNo?: string,
    // public file: File | null = null,
    // public status: string = 'Pending',
    public createdDate?: Date,
    public createdBy?: string,
    public updatedDate?: Date,
    public updatedBy?: string
  ) {
  }
}

export class BillSubmissionSearch implements IBillSubmissionSearch {
  constructor(
    public groupInvoiceNo?: string,
    public customerCodeName?: string,
    public fromDate?: string,
    public toDate?: string,
    public status?: string
  ) {}
}
