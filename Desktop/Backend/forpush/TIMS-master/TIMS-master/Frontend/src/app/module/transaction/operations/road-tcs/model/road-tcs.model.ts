// model/road-tcs.model.ts
export interface IRoadTcs {
  id?: number;
  date?: string;
  vehicleNumber?: string;
  panNo?: string;
  driverName?: string;
  vehicleSize?: string;
  sealNumber?: string;
  challanType?: string;
  remarks?: string;
  toBranch?: string;
  payableName?: string;
  vendorBrokerName?: string;
  driverNo?: string;
  route?: string;
  weightGuarantee?: number;
  noOfTouchingPoint?: number;
  lorryHire?: number;
  extraAmount?: number;
  advance?: number;
  balance?: number;
  tdsApplicable?: boolean;
  kantaVajan?: string;
  entryBy?: string;
  entryDate?: Date;
  updatedBy?: string;
  updatedDate?: Date;
}
