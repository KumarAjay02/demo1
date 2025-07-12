export interface IDocketEntrySearch {
  docketNo?: number;
  consignor?: string;
  consignee?: string;
  bookingDateFrom?:string;
  bookingDateTo?:string;
  IsActive?: string;
}

export class DocketEntrySearch implements IDocketEntrySearch {
  constructor(
    public docketNo?:number,
    public consignor?: string,
    public consignee?: string,
    public bookingDateFrom?:string,
    public bookingDateTo?:string,
    public IsActive?: string
  ) {}
}
