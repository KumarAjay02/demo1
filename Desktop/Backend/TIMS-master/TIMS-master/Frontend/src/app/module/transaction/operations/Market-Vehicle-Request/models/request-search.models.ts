export interface IRequestSearch {
  CustomerName?: string;
  CustomerCode?: number;
  Type?: string;
}

export class requestsearch implements IRequestSearch {
  constructor(
    public CustomerName?: string,
    public CustomerCode?: number,
    public Type?: string
  ) {}
}
