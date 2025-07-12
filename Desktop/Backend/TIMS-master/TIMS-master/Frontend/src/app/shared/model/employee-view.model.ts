
export interface IEmployeeView {
  login?: string;
  empCode?: string;
  factory?: string;
  factoryDesc?: string;
  name?: string;
  subCode?: string;
  subName?: string;
  subSname?: string;
  subCodeDesc?: string;
  subCodeAddress?: string;
  imagePath?: string;
  depCode?: string;
  depCodeDesc?: string;
  desCode?: string;
  desCodeDesc?: string;
  add1?: string;
  gCode?: string;
  doj?: any;
  dob?: any;
  cardNo?: string;
  email?: string;
  phone?: string;
  payCode?: string;
  pan?: string;
  sftCode?: string;
  adhNo?: string;
  uan?: string;
  supervisor?: string;
  hod?: string;
  hod2?: string;
  tempLock?: string;
  resignDate?: any;
  rdate?: any;
  active?: boolean;
  children?: IEmployeeView[];
  extensionNo?: string;
}

export class EmployeeView implements IEmployeeView {
  constructor(
    public login?: string,
    public empCode?: string,
    public factory?: string,
    public factoryDesc?: string,
    public name?: string,
    public subCode?: string,
    public subName?: string,
    public subSname?: string,
    public subCodeDesc?: string,
    public subCodeAddress?: string,
    public imagePath?: string,
    public depCode?: string,
    public depCodeDesc?: string,
    public desCode?: string,
    public desCodeDesc?: string,
    public add1?: string,
    public gCode?: string,
    public doj?: any,
    public dob?: any,
    public cardNo?: string,
    public email?: string,
    public phone?: string,
    public payCode?: string,
    public pan?: string,
    public sftCode?: string,
    public adhNo?: string,
    public uan?: string,
    public supervisor?: string,
    public hod?: string,
    public hod2?: string,
    public tempLock?: string,
    public resignDate?: any,
    public rdate?: any,
    public active?: boolean,
    public children?: IEmployeeView[],
    public extensionNo?: string,
  ) {}
}
