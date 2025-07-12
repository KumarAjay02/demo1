export interface IEmployeeSearch {
  empCode?: string;
  name?: string;
  aadharNo?: string;
  mobileNo?: string;
  panNo?: string;
  department?: string;
  designation?: string;
  size?: number;
  pageNo?: number;
  sort?: string;
  sortType?: string;
  status?: string;
}

export class EmployeeSearch implements IEmployeeSearch {
  constructor(
    public empCode?: string,
    public name?: string,
    public aadharNo?: string,
    public mobileNo?: string,
    public panNo?: string,
    public department?: string,
    public designation?: string,
    public size?: number,
    public pageNo?: number,
    public sort?: string,
    public sortType?: string,
    public status?: string
  ) {}
}
