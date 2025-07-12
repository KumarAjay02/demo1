import { IMenuMaster } from './menu-master.model';

export interface IMenuAccessMaster {
  id?: number;
  authorityName?: string;
  createdBy?: string;
  createdDate?: any; //Moment
  menuMaster?: IMenuMaster;
}

export class MenuAccessMaster implements IMenuAccessMaster {
  constructor(
    public id?: number,
    public authorityName?: string,
    public createdBy?: string,
    public createdDate?: any, //Moment
    public menuMaster?: IMenuMaster,
  ) {}
}
