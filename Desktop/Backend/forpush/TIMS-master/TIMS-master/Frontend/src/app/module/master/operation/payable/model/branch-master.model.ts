export interface IPayableBranchInfo {
  branchCode?: string;
  gstNo?: string;
  address?: string;
  address2?: string;
  city?: string;
  pinCode?: string;
  state?: string;
  country?: string;
  contactPerson?: string;
  mobile1?: string;
  mobile2?: string;
  emailId?: string;
}

export class PayableBranchInfo implements IPayableBranchInfo {
  branchCode?: string;
  gstNo?: string;
  address?: string;
  address2?: string;
  city?: string;
  pinCode?: string;
  state?: string;
  country?: string;
  contactPerson?: string;
  mobile1?: string;
  mobile2?: string;
  emailId?: string;

  constructor(init?: Partial<IPayableBranchInfo>) {
    Object.assign(this, init);
  }
}
