export interface IUserRights {
  menuId?: number;
  view?: boolean;
  search?: boolean;
  add?: boolean;
  update?: boolean;
  deleted?:boolean;
  print?: boolean;
  approval?: boolean;
  isActive?: boolean;
}

export class UserRights implements IUserRights {
  constructor(
    public menuId?: number,
    public view?: boolean,
    public search?: boolean,
    public add?: boolean,
    public update?: boolean,
    public deleted?: boolean,
    public print?: boolean,
    public approval?: boolean,
    public isActive?: boolean,
    ) {}
}
