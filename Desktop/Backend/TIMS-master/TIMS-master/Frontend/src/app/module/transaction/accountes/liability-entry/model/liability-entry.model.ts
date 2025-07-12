export interface ILiabilityEntry {
  id?: number;
  financialYear?: string;
  billType?: string;
  billNumber?: string;
  billDate?: string;
  supplier?: string;
  companyType?: string;
  liabilityType?: string;
  liabilityDate?: string;
  liabilityDueDate?: string;
  createdDate?: Date;
  createdBy?: string;
  updatedDate?: Date;
  updatedBy?: string;
}

export interface ILiabilityEntrySearch {
  billNumber?: string;
  supplier?: string;
  liabilityType?: string;
  fromDate?: string;
  toDate?: string;
}

export class LiabilityEntry implements ILiabilityEntry {
  constructor(
    public id?: number,
    public financialYear?: string,
    public billType?: string,
    public billNumber?: string,
    public billDate?: string,
    public supplier?: string,
    public companyType?: string,
    public liabilityType?: string,
    public liabilityDate?: string,
    public liabilityDueDate?: string,
    public createdDate?: Date,
    public createdBy?: string,
    public updatedDate?: Date,
    public updatedBy?: string
  ) {}
}

export class LiabilityEntrySearch implements ILiabilityEntrySearch {
  constructor(
    public billNumber?: string,
    public supplier?: string,
    public liabilityType?: string,
    public fromDate?: string,
    public toDate?: string,
  ) {}
}
