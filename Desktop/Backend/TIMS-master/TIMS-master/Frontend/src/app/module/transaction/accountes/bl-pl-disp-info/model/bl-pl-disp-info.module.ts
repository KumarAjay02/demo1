
export interface IBS_DISP_INFO {
  Id?: number;
  GL_NATURE?: number;
  BS_HEAD_CODE?: string;
  BS_HEAD_NAME?: string;
  SCHEDULE_CODE?: number;
  GL_GROUP_CODE?: number;
  SRNO?: number;
  AMOUNT?: number

}

export class BS_DISP_INFO implements IBS_DISP_INFO {
  constructor(
    public Id?: number,
    public GL_NATURE?: number,
    public BS_HEAD_CODE?: string,
    public BS_HEAD_NAME?: string,
    public SCHEDULE_CODE?: number,
    public GL_GROUP_CODE?: number,
    public SRNO?: number,
    public AMOUNT?: number
  ) { }
}
