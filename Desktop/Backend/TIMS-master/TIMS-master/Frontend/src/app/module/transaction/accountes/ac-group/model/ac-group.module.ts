export interface IAccount_Groups {
  SerialNo?: number;
  AC_Nature?: number;
  ScheduleCode?: number;
  GroupCode?: number;
  GroupDesc?: string;
  Bs_GroupDesc?: string;
  IsActive?: boolean;
  createdBy?: string;
  createdDate?: Date;
  modifiedBy?: string;
  modifiedDate?: Date;
}

export class Account_Groups implements IAccount_Groups {
  constructor(
    public SerialNo?: number,
    public AC_Nature?: number,
    public ScheduleCode?: number,
    public GroupCode?: number,
    public GroupDesc?: string,
    public Bs_GroupDesc?: string,
    public IsActive?: boolean,
    public createdBy?: string,
    public createdDate?: Date,
    public modifiedBy?: string,
    public modifiedDate?: Date
  ) { }
}
