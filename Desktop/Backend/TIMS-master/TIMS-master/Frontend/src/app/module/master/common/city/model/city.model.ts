export interface ICity {
  id?: number;
  serialNo?: number;
  cityCode?: string;
  cityName?: string;
  pinCode?: string;
  stdCode?: string;
  category?: string;
  zone?: string;
  countryCode?: string;
  countryName?:string;
  stateCode?: string;
  stateName?:string;
  isActive?: string;
  createdBy?: string;
  createdOn?: string;
  modifiedBy?: string;
  modifiedOn?: string;
}

export class City implements ICity {
  constructor(
    public id?: number,
    public serialNo?: number,
    public cityCode?: string,
    public cityName?: string,
    public pinCode?: string,
    public stdCode?: string,
    public category?: string,
    public zone?: string,
    public countryCode?: string,
    public countryName?: string,
    public stateCode?: string,
    public stateName?: string,
    public isActive?: string,
    public createdBy?: string,
    public createdOn?: string,
    public modifiedBy?: string,
    public modifiedOn?: string,
  ) {}
}
