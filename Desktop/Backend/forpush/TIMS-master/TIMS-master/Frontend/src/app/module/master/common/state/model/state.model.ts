export interface IState {
  id: number;
  serialNo: number;
  stateCode: string;
  stateName: string;
  countryCode: string;
  zone?: string;
  capital?: string;
  isActive: string;
  createdBy?: string;
  createdOn?: Date;
  modifiedBy?: string;
  modifiedOn?: Date;
  stateNo?: string;
  smgstin?: string;
  smeWayBillUserId?: string;
  smeWayBillPassword?: string;
  ewayBillGenStates?: string;
  gstinnoAvailable?: string;
}

// Class
export class State implements IState {
  constructor(
    public id = 0,
    public serialNo = 0,
    public stateCode = '',
    public stateName = '',
    public countryCode = '',
    public zone?: string,
    public capital?: string,
    public isActive = '',
    public createdBy?: string,
    public createdOn?: Date,
    public modifiedBy?: string,
    public modifiedOn?: Date,
    public stateNo?: string,
    public smgstin?: string,
    public smeWayBillUserId?: string,
    public smeWayBillPassword?: string,
    public ewayBillGenStates?: string,
    public gstinnoAvailable?: string
  ) {}
}
