// model/costtype.model.ts
export interface ICostType {
  costCodeId?: number;
  costCodeTypeDesc?: string;
  status?: string;
  createdBy?: string;
  createdDate?: Date;
  modifiedBy?: string;
  modifiedDate?: Date;
}

export class CostType implements ICostType {
  constructor(
    public costCodeId?: number,
    public costCodeTypeDesc?: string,
    public status?: string,
    public createdBy?: string,
    public createdDate?: Date,
    public modifiedBy?: string,
    public modifiedDate?: Date
  ) { }
}
