export interface IRights {
  id?: number;
  user?: string;
  menuId?: number;
  menuName?: string;
  menuType?: string;
  view?: boolean;
  add?: boolean;
  update?: boolean;
  deleted?: boolean;
  print?: boolean;
  approval?: boolean;
  search?: boolean;
  isActive?: boolean;
  url?: string;
  parentMenuId?: number;
}
export class Rights implements IRights {
  constructor(
    public id?: number,
    public user?: string,
    public menuId?: number,
    public menuName?: string,
  public menuType?: string,
  public view?: boolean,
  public add?: boolean,
  public update?: boolean,
  public deletes?: boolean,
  public print?: boolean,
  public approval?: boolean,
  public search?: boolean,
  public isActive?: boolean,
  public url?: string,
    public parentMenuId?: number,
  ) { }


}
