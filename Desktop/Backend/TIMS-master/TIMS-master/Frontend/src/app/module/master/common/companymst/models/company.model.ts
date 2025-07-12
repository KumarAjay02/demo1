export interface ICompany {
  id?: number;
  serialNo?: number;
  cityName?: string;
  stdCode?: string;
  category?: string;
  zone?: string;
  isActive?: string;
  coCode?: string;
  coName?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  countryCode?: string;
  stateCode?: string;
  cityCode?: string;
  pinCode?: number;
  gstn?: string;
  pan?: string;
}

export class Company implements ICompany {
  constructor(
    public id?: number,
    public serialNo?: number,
    public cityName?: string,
    public stdCode?: string,
    public category?: string,
    public zone?: string,
    public isActive?: string,
    public coCode?: string,
    public coName?: string,
    public address1?: string,
    public address2?: string,
    public address3?: string,
    public countryCode?: string,
    public stateCode?: string,
    public cityCode?: string,
    public pinCode?: number,
    public gstn?: string,
    public pan?: string
  ) {}
}
