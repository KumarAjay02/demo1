export interface IChallanEntry {
  challanType: string;
  challanNumber: string;
  id: any;
  date: string;
  fromBranch: string;
  toBranch: string;
  mode: string;
  route: string;
  vehicleNumber: string;
  weight:number;
  ackInd:string;
  ackBy:string;
  clnErp:string;
}

export class ChallanEntry implements IChallanEntry {
  constructor(
    public  challanNumber: string,
    public  challanType: string,
  public  id: any = null,
  public   date: string = this.getCurrentDate(),
  public  fromBranch: string,
  public  toBranch: string,
  public  mode: string,
  public  route: string,
  public  vehicleNumber: string,
  public  weight:number,
  public  ackInd:string,
  public  ackBy:string,
  public  clnErp:string){}
  // constructor(init?: Partial<IChallanEntry>) {
  //   Object.assign(this, init);
  // }
  //
  private getCurrentDate(): string {
    return new Date().toISOString().split('T')[0]; // format as yyyy-mm-dd
  }
}
