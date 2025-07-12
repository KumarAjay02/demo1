export interface IDocketEwayPart {
  eWayBillNo?: string;
  consignorPartNo?: string;
  consigneePartNo?: string;
  actualQuantity?: number;
  noOfPackages?: number;
}

export class DocketEwayPart implements IDocketEwayPart {
  constructor(
    public eWayBillNo?: string,
  public consignorPartNo?: string,
  public consigneePartNo?: string,
  public actualQuantity?: number,
  public noOfPackages?: number,
  ) {}
}
