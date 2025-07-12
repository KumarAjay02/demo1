import {IDocketEwayPart} from './docket-part-detail.model';

export interface IDocketEway {
  eWayBillNo?: string;
  invoiceNo?: number;
  eWayExpiryDate?: number;
  date?: number;
  value?: number;
  quantity?: number;
  partDetails?: IDocketEwayPart[];
  expanded?: boolean;
}

export class DocketEway implements IDocketEway {
  constructor(
    public eWayBillNo?: string,
  public invoiceNo?: number,
  public eWayExpiryDate?: number,
  public date?: number,
  public value?: number,
  public quantity?: number,
  public partDetails?: IDocketEwayPart[],
    public expanded?: boolean,
  ) {}
}
