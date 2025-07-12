// model/city.model.ts
export interface IAC_Schedule {
  serialNo?: number;
  scheduleCode?: number;
  scheduleDesc?: string;
  glNature?: number;
  accountNatureDesc?: string;
  status?: string;
  createdBy?: string;
  createdOn?: Date;
  modifiedBy?: string;
  modifiedOn?: Date;
}

export class AC_Schedule implements IAC_Schedule {
  constructor(
    public serialNo?: number,
    public scheduleCode?: number,
    public scheduleDesc?: string,
    public glNature?: number,
    public accountNatureDesc?: string,
    public status?: string,
    public createdBy?: string,
    public createdOn?: Date,
    public modifiedBy?: string,
    public modifiedOn?: Date
  ) { }
}
