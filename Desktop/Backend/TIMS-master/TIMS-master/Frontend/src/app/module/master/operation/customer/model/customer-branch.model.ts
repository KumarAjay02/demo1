import { ICity } from '../../../common/city/model/city.model';
import { ICountry } from '../../../common/country/model/country.model';
import { IPinCodeMaster } from '../../../common/pincodemst/form/models/pincodemst.model';
import { IState } from '../../../common/state/model/state.model';
import {ICustomerPlant} from './customer-plant.model';
 

export interface ICustomerBranch {
  plant: ICustomerPlant[];
  coCode?: string;
  divCode?: string;
  branch?: string;
  customerCode?: number;
  customerDetCode?: number;
  gstin?:string;
  surcharge?:number;
  address?: string;
  city?: string;
  cityName?: string;
  cityMaster?: ICity;
  state?: string;
  stateName?: string;
  stateMaster?: IState;
  pinCode?: number;
  pinCodeMaster?: IPinCodeMaster;
  countryMaster?: ICountry;
  countryName?: string;
  country?: string;
  dealingPerson1?:string;
  email1?: string;
  landlineNo1?: number;
  mobileNo1?: number;
  dealingPerson2?:string;
  email2?: string;
  mobileNo2?: number;
  isActive?:string;
  createdBy?: string;
  createdOn?: Date;
  modifiedBy?: string;
  modifiedOn?: Date;
  customerDet2s?:ICustomerPlant[];
  expand?:boolean;
}

export class CustomerBranch implements ICustomerBranch {
  coCode?: string;
  divCode?: string;
  branch?: string;
  customerCode?: number;
  customerDetCode?: number;
  gstin?:string;
  surcharge?:number;
  address?: string;
  city?: string;
  cityName?: string;
  cityMaster?: ICity;
  state?: string;
  stateName?: string;
  stateMaster?: IState;
  pinCode?: number;
  pinCodeMaster?: IPinCodeMaster;
  countryMaster?: ICountry;
  countryName?: string;
  country?: string;
  dealingPerson1?:string;
  email1?: string;
  landlineNo1?: number;
  mobileNo1?: number;
  dealingPerson2?:string;
  email2?: string;
  mobileNo2?: number;
  isActive?:string;
  createdBy?: string;
  createdOn?: Date;
  modifiedBy?: string;
  modifiedOn?: Date;
  customerDet2s?:ICustomerPlant[];
  expand?:boolean;

  constructor(init?: Partial<ICustomerBranch>) {
    Object.assign(this, init);
  }
  plant: ICustomerPlant[];
}
