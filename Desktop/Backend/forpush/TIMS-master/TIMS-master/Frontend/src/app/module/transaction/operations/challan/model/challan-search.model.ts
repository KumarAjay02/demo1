// model/challan-search.model.ts
export interface IChallanSearch {
  challanNumber: string;
  vehicleNumber?: string;
  challanDate?: string;
  docketNo?: string;
}

export class ChallanSearch implements IChallanSearch {
  constructor(
    public challanNumber: string,
    public vehicleNumber?: string,
    public challanDate?: string,
    public docketNo?: string
  ) {}
}
