export interface ITcs {
  tcsNo: number;
  tcsDate: string;
  brokerName: string;
  lhcAmt: number;
  advancePaid: number;
  balance: number;
  hamali: number;
  extraKmAmount: number;
  halting: number;
  rto: number;
  incentive: number;
  latePenalty: number;
  materialDamage: number;
  otherDeduction: number;
  totalLorryHire: number;
  tdsAmount: number;
  totalIncAmount: number;
  totalDeductionAmount: number;
  finalPaymentAmount: number;
  selected: boolean;
}
export class TCS implements ITcs {
  constructor(
    public tcsNo: number,
    public tcsDate: string,
  public brokerName: string,
  public lhcAmt: number,
  public advancePaid: number,
  public balance: number,
  public hamali: number,
  public extraKmAmount: number,
  public halting: number,
  public rto: number,
  public incentive: number,
  public latePenalty: number,
  public materialDamage: number,
  public otherDeduction: number,
  public totalLorryHire: number,
  public tdsAmount: number,
  public totalIncAmount: number,
  public totalDeductionAmount: number,
  public finalPaymentAmount: number,
  public selected: boolean){}
}
