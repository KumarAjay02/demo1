export interface IMaster {
  id?: string;
  planId?: number;
  code?: string;
  desc?: string;
  username?: string;
  firstName?: string;
  name?: string;
  style?: string;
  pono?: string;
  materialGroup?: string;
  color?: string;
  extract?: boolean;
  btnType?: string;
  plantCode?: string;
  plantCodeName?: string;
  plantDescription?: string;
  destination?: string;
  destinationDesc?: string;
  lotNo?: string;
  markerId?: number;
  page?: any;
  sort?: string;
  sortType?: string;
  size?: number;
  pageNo?: number;
}

export class Master implements IMaster {
  constructor(
    public id?: string,
    public planId?: number,
    public code?: string,
    public desc?: string,
    public username?: string,
    public firstName?: string,
    public name?: string,
    public style?: string,
    public pono?: string,
    public materialGroup?: string,
    public color?: string,
    public extract?: boolean,
    public btnType?: string,
    public plantCode?: string,
    public plantCodeName?: string,
    public plantDescription?: string,
    public destination?: string,
    public destinationDesc?: string,
    public lotNo?: string,
    public markerId?: number,
    public page?: any,
    public sort?: string,
    public sortType?: string,
    public size?: number,
    public pageNo?: number,
  ) {}
}
