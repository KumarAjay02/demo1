export interface IDocketEnquirySearch {
  DocketNo?: string;
  InvoiceNo?: string;
  eWaybillNo?: string;
  Company?: string;
  Division?: string;
}

export class DocketEnquirySearch implements IDocketEnquirySearch {
  constructor(
    public DocketNo?: string,
    public InvoiceNo?: string,
    public eWaybillNo?: string,
    public Company?: string,
    public Division?: string
  ) { }
}
