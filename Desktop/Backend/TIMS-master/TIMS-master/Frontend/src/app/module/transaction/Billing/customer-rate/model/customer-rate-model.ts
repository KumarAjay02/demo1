export interface ICustomerRateMaster {
  contractNo: string;
  customerCode: number;
  fromBranch: string;
  toBranch: string;
  mode: string;
  chargeType: string;
  minimumWeight?: number | null;
  rate?: number | null;
  freight?: number | null;
  fuel?: number | null;
  dkt?: number | null;
  wb?: number | null;
  pickup?: number | null;
  delivery?: number | null;
  odaPickup?: number | null;
  odaDelivery?: number | null;
  rovFovPer?: number | null;
  toPay?: number | null;
  cod?: number | null;
  dacc?: number | null;
  minimum?: number | null;
  cft?: number | null;
  loading?: number | null;
  unloading?: number | null;
  mathadi?: number | null;
  hamali?: number | null;
  emptyReversal?: number | null;
  emptyLocalReversal?: number | null;
  wh?: number | null;
  misc?: number | null;
  createdBy?: string | null;
  createdOn?: Date | null;
  modifyBy?: string | null;
  modifyOn?: Date | null;
  reverseApplicable?: number | null;
}

export class CustomerRateMaster implements ICustomerRateMaster {
  contractNo!: string;
  customerCode!: number;
  fromBranch!: string;
  toBranch!: string;
  mode!: string;
  chargeType!: string;
  minimumWeight?: number | null;
  rate?: number | null;
  freight?: number | null;
  fuel?: number | null;
  dkt?: number | null;
  wb?: number | null;
  pickup?: number | null;
  delivery?: number | null;
  odaPickup?: number | null;
  odaDelivery?: number | null;
  rovFovPer?: number | null;
  toPay?: number | null;
  cod?: number | null;
  dacc?: number | null;
  minimum?: number | null;
  cft?: number | null;
  loading?: number | null;
  unloading?: number | null;
  mathadi?: number | null;
  hamali?: number | null;
  emptyReversal?: number | null;
  emptyLocalReversal?: number | null;
  wh?: number | null;
  misc?: number | null;
  createdBy?: string | null;
  createdOn?: Date | null;
  modifyBy?: string | null;
  modifyOn?: Date | null;
  reverseApplicable?: number | null;

  constructor(init?: Partial<ICustomerRateMaster>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
export interface ICustomerContractMaster {
  srNo?: number;
  contractNo: string;
  validFromDate?: Date | null;
  validToDate?: Date | null;
  applicable?: string | null;
  customerCode?: number | null;
  dieselRate?: number | null;
  remarks?: string | null;
  filePath?: string | null;
  imageName?: string | null;
  fileType?: string | null;
  modifyBy?: string | null;
  modifyDate?: Date | null;
}

export class CustomerContractMaster implements ICustomerContractMaster {
  srNo?: number;
  contractNo!: string;
  validFromDate?: Date | null;
  validToDate?: Date | null;
  applicable?: string | null;
  customerCode?: number | null;
  dieselRate?: number | null;
  remarks?: string | null;
  filePath?: string | null;
  imageName?: string | null;
  fileType?: string | null;
  modifyBy?: string | null;
  modifyDate?: Date | null;

  constructor(init?: Partial<ICustomerContractMaster>) {
    Object.assign(this, init);
  }
}


