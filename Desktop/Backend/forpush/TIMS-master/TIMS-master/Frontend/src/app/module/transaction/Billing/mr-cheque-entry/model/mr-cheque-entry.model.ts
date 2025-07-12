// model/mr-cheque-entry.model.ts
export interface IMrChequeEntry {
  id?: number;
  branchCode?: string;
  customerNameCode?: string;
  customerName?: string;
  deduction?: string;
  annotation?: string;
  submissionDate?: string;
  remarks?: string;
  payMode?: string;
  bank?: string;
  payType?: string;
  chequeDate?: string;
  docketNo?: string;
  amount?: number;
  tdsReverseAmount?: number;
  status?: string;
  createdDate?: Date;
  createdBy?: string;
  updatedDate?: Date;
  updatedBy?: string;
}

export interface IMrChequeEntrySearch {
  entryNumber?: string;
  customerName?: string;
  fromDate?: string;
  toDate?: string;
  status?: string;
}

export class MrChequeEntry implements IMrChequeEntry {
  constructor(
    public id?: number,
    public branchCode?: string,
    public customerNameCode?: string,
    public customerName?: string,
    public deduction?: string,
    public annotation?: string,
    public submissionDate?: string,
    public remarks?: string,
    public payMode?: string,
    public bank?: string,
    public payType?: string,
    public chequeDate?: string,
    public docketNo?: string,
    public amount = 0,
    public tdsReverseAmount = 0,
    public status = 'Pending',
    public createdDate?: Date,
    public createdBy?: string,
    public updatedDate?: Date,
    public updatedBy?: string
  ) {}
}

export class MrChequeEntrySearch implements IMrChequeEntrySearch {
  constructor(
    public entryNumber?: string,
    public customerName?: string,
    public fromDate?: string,
    public toDate?: string,
    public status?: string
  ) {}
}
