// model/payable.model.ts
export interface IPayable {
  Id?: number;
  SerialNo?: number;
  CoCode?: string;
  DivCode?: string;
  PayableForm?: string;
  PayableId?: string;
  PayableType?: string;
  PayableName?: string;
  AssociationDate?: Date;
  ActiveState?: string;
  PanNo?: string;
  AdhaarNo?: string;
  CompanyType?: string;
  PayableCategory?: string;
  AccountNo?: string;
  IfscCode?: string;
  BankName?: string;
  Remarks?: string;
  DeptType?: string;
  Msme?: string;
  EntryBy?: string;
  EntryDate?: Date;
  UpdatedBy?: string;
  UpdatedDate?: Date;
}
