export interface IBillSearch {
  billNumber?: string;
  serviceMode?: string;
  fromDate?: string;
  toDate?: string;
}
export class BillSearch implements IBillSearch {
  constructor(
    public billNumber?: string,
    public serviceMode?: string,
    public fromDate?: string,
    public toDate?: string
  ) {}
}
