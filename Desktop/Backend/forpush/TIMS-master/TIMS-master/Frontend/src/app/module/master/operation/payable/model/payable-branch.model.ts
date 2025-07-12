export interface IPayableBranch {
  id?: number; // local id
  customerId?: string;
  branchCode?: string;
  branch?: string;
  gstNo?:string;
  surcharge?:number;
  address?: string;
  city?: string;
  state?: string;
  pinCode?: number;
  country?: string;
  dealingPerson1?:string;
  eMail1?: string;
  lanLineNo?: number;
  mobileNo?: number;
  dealingPerson2?:string;
  eMail2?: string;
  mobileNo2?: number;
  isActive?:string;
  createdBy?: string;
  createdOn?: Date;
  updatedBy?: string;
  updateDate?: Date;
  expand?:boolean;
}

export class PayableBranch implements IPayableBranch {
  id?: number; // local id
  customerId?: string;
  branchCode?: string;
  branch?: string;

  gstNo?:string;
  surcharge?:number;
  address?: string;
  city?: string;
  state?: string;
  pinCode?: number;
  country?: string;
  dealingPerson1?:string;
  eMail1?: string;
  lanLineNo?: number;
  mobileNo?: number;
  dealingPerson2?:string;
  eMail2?: string;
  mobileNo2?: number;
  isActive?:string;
  createdBy?: string;
  createdOn?: Date;
  updatedBy?: string;
  updateDate?: Date;
  expand?:boolean;

  constructor(init?: Partial<IPayableBranch>) {
    Object.assign(this, init);
  }
}
