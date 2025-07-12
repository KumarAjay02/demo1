export interface IRentLiabilityApproval {
  id?: number;
  branchCode?: string;
  financialYear?: string;
  fromDate?: string;
  toDate?: string;
  approvalNumber?: string;
  approvalDate?: string;
  status?: string;
  createdDate?: Date;
  createdBy?: string;
  updatedDate?: Date;
  updatedBy?: string;
}

export interface IRentLiabilityApprovalSearch {
  approvalNumber?: string;
  approvalDate?: string;
}

export class RentLiabilityApproval implements IRentLiabilityApproval {
  constructor(
    public id?: number,
    public branchCode?: string,
    public financialYear?: string,
    public fromDate?: string,
    public toDate?: string,
    public approvalNumber?: string,
    public approvalDate?: string,
    public status?: string,
    public createdDate?: Date,
    public createdBy?: string,
    public updatedDate?: Date,
    public updatedBy?: string
  ) {}
}

export class RentLiabilityApprovalSearch implements IRentLiabilityApprovalSearch {
  constructor(
    public approvalNumber?: string,
    public approvalDate?: string
  ) {}
}
