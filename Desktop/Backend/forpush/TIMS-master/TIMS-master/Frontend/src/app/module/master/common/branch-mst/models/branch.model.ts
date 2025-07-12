// model/city.model.ts
export interface IBranch {
  id?: number;
  coCode?: string;
  divCode?: string;
  branchName?: string;
  branchCode?: string;
  branchType?: string;
  branchAddress?: string;
  branchCity?: string;
  branchPinCode?: number;
  contactPerson?: string;
  mobileNo?: number;
  branchFax?: number;
  branchEmail?: string;
  zonalOffice?: string;
  regionalOffice?: string;
  areaOffice?: string;
  docketStartingCode?: string;
  isActive?: boolean;
  gstin?: string;
  branchState?: string;
  zone?: string;
  da?: string;
  eWayBillUserId?: string;
  eWayBillPassword?: string;
  biometricInstalled?: string;
  companyCode?: string;
  reportingMgrEmail?: string;
  cctvInstalled?: string;
  branchMode?: string;
  netConnect?: string;
  netProvider?: string;
  crptEmail?: string;
  zonalOfficeDesc?: string;
  loaIsActive?: string;
  createdBy?: string;
  createdOn?: string;
  modifiedBy?: string;
  modifiedOn?: Date;
}

export class Branch implements IBranch {
  constructor(
    public id?: number,
    public coCode?: string,
    public divCode?: string,
    public branchName?: string,
    public branchCode?: string,
    public branchType?: string,
    public branchAddress?: string,
    public branchCity?: string,
    public branchPinCode?: number,
    public contactPerson?: string,
    public mobileNo?: number,
    public branchFax?: number,
    public branchEmail?: string,
    public zonalOffice?: string,
    public regionalOffice?: string,
    public areaOffice?: string,
    public docketStartingCode?: string,
    public isActive?: boolean,
    public gstin?: string,
    public branchState?: string,
    public zone?: string,
    public da?: string,
    public eWayBillUserId?: string,
    public eWayBillPassword?: string,
    public biometricInstalled?: string,
    public companyCode?: string,
    public reportingMgrEmail?: string,
    public cctvInstalled?: string,
    public branchMode?: string,
    public netConnect?: string,
    public netProvider?: string,
    public crptEmail?: string,
    public zonalOfficeDesc?: string,
    public loaIsActive?: string,
    public createdBy?: string,
    public createdOn?: string,
    public modifiedBy?: string,
    public modifiedOn?: Date
  ) {}
}
