// model/ac-schedule-search.model.ts
export interface IAC_ScheduleSearch {
  scheduleCode?: string;
  scheduleDesc?: string;
  glNature?: string;
  fileType?: string;
}

export class AC_ScheduleSearch implements IAC_ScheduleSearch {
  constructor(
    public scheduleCode?: string,
    public scheduleDesc?: string,
    public glNature?: string,
    public fileType?: string,
  ) { }

}
