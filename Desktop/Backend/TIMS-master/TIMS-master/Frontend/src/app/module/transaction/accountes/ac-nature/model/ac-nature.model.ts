export interface IAccount_Nature {
  serialNo?: number;
  accountNature?: number;
  accountNatureDesc?: string;
  isActive?: string;
  //createdBy?: string;
  //createdOn?: Date;
  //modifiedBy?: string;
  //modifiedOn?: Date;
}

export class Account_Nature implements IAccount_Nature {
  constructor(
    public serialNo?: number,
    public accountNature?: number,
    public accountNatureDesc?: string,
    public isActive?: string,
    //public createdBy?: string,
    //public createdOn?: Date,
    //public modifiedBy?: string,
    //public modifiedOn?: Date
  ) { }
}

export interface IAccount_NatureSearch {
  accountNature?: string;
  accountNatureDesc?: string;
  fileType?: string;

}

export class Account_NatureSearch implements IAccount_NatureSearch {
  constructor(
    public accountNature?: string,
    public accountNatureDesc?: string,
    public fileType?: string,
  ) { }

}
