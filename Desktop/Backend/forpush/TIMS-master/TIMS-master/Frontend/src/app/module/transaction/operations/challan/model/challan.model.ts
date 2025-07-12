export interface IChallanEntry {
  challanType: string;
  challanNumber: string;
  id: any;
  date: string;
  toBranch: string;
  mode: string;
  route: string;
  vehicleNumber: string;
  sealNo: string;
  docketNo: string;
  remark: string;
  pDate: string;
  pVehicleNumber: string;
  pConsEwayBill: string;
  LDate: string;
  LToBranch: string;
  LDataTransfer: string;
  LVehicleNumber: string;
  LTCSNo: string;
  LDocketNo: string;
  LSDate: string;
  LSVehicleNumber: string;
  LSdocketNo: string;
  dDate: string;
  dVehicleNumber: string;
  dDocketNo: string;
  entryBy: string;
  entryDate: string;
  updatedBy: string;
  updatedDate: string;
}

export class ChallanEntry implements IChallanEntry {
  challanNumber: string;
  challanType: string;
  id: any = null;
  date: string = this.getCurrentDate();
  toBranch: string;
  mode: string;
  route: string;
  vehicleNumber: string;
  sealNo: string;
  docketNo: string;
  remark: string;
  pDate: string = this.getCurrentDate();
  pVehicleNumber: string;
  pConsEwayBill: string;
  LDate: string = this.getCurrentDate();
  LToBranch: string;
  LDataTransfer: string;
  LVehicleNumber: string;
  LTCSNo: string;
  LDocketNo: string;
  LSDate: string = this.getCurrentDate();
  LSVehicleNumber: string;
  LSdocketNo: string;
  dDate: string;
  dVehicleNumber: string;
  dDocketNo: string;
  entryBy: string;
  entryDate: string;
  updatedBy: string;
  updatedDate: string;

  constructor(init?: Partial<IChallanEntry>) {
    Object.assign(this, init);
  }

  private getCurrentDate(): string {
    return new Date().toISOString().split('T')[0]; // format as yyyy-mm-dd
  }
}
