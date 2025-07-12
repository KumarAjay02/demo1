// model/payable-detail.model.ts

import {IPayableBranchInfo} from './branch-master.model';

export interface IPayableDetail {
  id?: number; // local id
  payableId?: string;
  branch?: IPayableBranchInfo;
  activeStatus?: string;
  entryBy?: string;
  entryDate?: Date;
  updatedBy?: string;
  updateDate?: Date;
}

export class PayableDetail implements IPayableDetail {
  id?: number;
  payableId?: string;
  branch ?:IPayableBranchInfo;
  activeStatus?: string;
  entryBy?: string;
  entryDate?: Date;
  updatedBy?: string;
  updateDate?: Date;

  constructor(init?: Partial<IPayableDetail>) {
    Object.assign(this, init);
  }
}
