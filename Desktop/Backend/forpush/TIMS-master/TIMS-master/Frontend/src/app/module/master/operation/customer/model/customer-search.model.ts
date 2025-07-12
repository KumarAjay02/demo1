export interface ICustomerSearch {
  CustomerName?: string;
  CustomerCode?: number;
  Type?: string;
  branchGstNo?: string;
  panNo?: string;
  fileType?: string;
}

export class CustomerSearch implements ICustomerSearch {
  constructor(
    public CustomerName?: string,
    public CustomerCode?: number,
    public Type?: string,
    public branchGstNo?:string,
    public panNo?:string,
    public fileType?: string
  ) {}
}
