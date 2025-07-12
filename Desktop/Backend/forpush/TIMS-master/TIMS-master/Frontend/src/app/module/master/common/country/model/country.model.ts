// model/country.model.ts
export interface ICountry {
  serialNo?: string;
  countryName?: string;
  countryCode?: string;
  currency?:string;
  isActive?: string;
  CreatedBy?:string;
 
  ModifiedBy?:string;
 


 
}

export class Country implements ICountry {
  constructor(
    public serialNo: string = '',
    public countryName: string = '',
    public countryCode: string = '',
    public currency:string='',
    public isActive: string = ' ',
    
  ) {}
}
