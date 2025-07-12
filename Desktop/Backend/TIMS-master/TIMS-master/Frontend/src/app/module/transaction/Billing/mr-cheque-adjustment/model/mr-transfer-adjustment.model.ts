export interface IMrTransferAdjustment {
  id?: number;
  branch?: string;
  mrNumber?: string;
  mrDate?: string;
  paymentType?: string;
  balanceAmt?: number;
  adjustmentNumber?: string;
  adjustmentDate?: string;
  createdDate?: Date;
  createdBy?: string;
  updatedDate?: Date;
  updatedBy?: string;
}

export interface IMrTransferAdjustmentSearch {
  adjustmentNumber?: string;
  mrNumber?: string;
  adjustmentDate?: string;
}

export class MrTransferAdjustment implements IMrTransferAdjustment {
  constructor(
    public id?: number,
    public branch?: string,
    public mrNumber?: string,
    public mrDate?: string,
    public paymentType?: string,
    public balanceAmt?: number,
    public adjustmentNumber?: string,
    public adjustmentDate?: string,
    public createdDate?: Date,
    public createdBy?: string,
    public updatedDate?: Date,
    public updatedBy?: string
  ) {}
}

export class MrTransferAdjustmentSearch implements IMrTransferAdjustmentSearch {
  constructor(
    public adjustmentNumber?: string,
    public mrNumber?: string,
    public adjustmentDate?: string
  ) {}
}
