export interface IMenuSave {
  cardNo?: string;
  menus?: number[];
}

export class MenuSave implements IMenuSave {
  constructor(public cardNo?: string, public menus?: number[]) {}
}
