export interface IMenuItem {
  menuName?: string;
  menyType?: string;
  link?: string;
  menuId?: number;
  children?: IMenuItem[];
}
export class MenuItem implements IMenuItem {
  constructor(
    public menuName?: string,
    public menyType?: string,
    public link?: string,
    public menuId?: number,
    public children?: IMenuItem[]
  ) {
  }
}
