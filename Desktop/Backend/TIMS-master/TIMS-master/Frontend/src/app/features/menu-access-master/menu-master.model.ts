export interface IMenuMaster {
  id?: number;
  menuLabel?: string;
  menuIcon?: string;
  menuLink?: string;
  folder?: boolean;
  collapsed?: boolean;
  folderId?: number;
  parent?: boolean;
  createdBy?: string;
  createdDate?: any; //Moment
  qlikType?: string;
  qlikUrl?: string;
  qlikLabel?: string;
  qlikUrlTwo?: string;
  qlikLabelTwo?: string;
  qlikUrlThree?: string;
  qlikLabelThree?: string;
  qlikUrlFour?: string;
  qlikLabelFour?: string;
  qlikUrlFive?: string;
  qlikLabelFive?: string;
  qlikUrlSafe?: any;
}

export class MenuMaster implements IMenuMaster {
  constructor(
    public id?: number,
    public menuLabel?: string,
    public menuIcon?: string,
    public menuLink?: string,
    public folder?: boolean,
    public collapsed?: boolean,
    public folderId?: number,
    public parent?: boolean,
    public createdBy?: string,
    public createdDate?: any, //Moment
    public qlikType?: string,
    public qlikUrl?: string,
    public qlikLabel?: string,
    public qlikUrlTwo?: string,
    public qlikLabelTwo?: string,
    public qlikUrlThree?: string,
    public qlikLabelThree?: string,
    public qlikUrlFour?: string,
    public qlikLabelFour?: string,
    public qlikUrlFive?: string,
    public qlikLabelFive?: string,
    public qlikUrlSafe?: any,
  ) {
    this.folder = this.folder || false;
    this.collapsed = this.collapsed || false;
    this.parent = this.parent || false;
  }
}
