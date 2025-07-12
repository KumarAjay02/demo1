export interface IMenuNode {
  text: string;
  value?: number;
  children?: IMenuNode[];
  checked?: boolean;
  indeterminate?: boolean;
  parent?: IMenuNode;
}

export class MenuNode implements IMenuNode {
  constructor(
    public text: string,
    public value?: number,
    public children?: IMenuNode[],
    public checked?: boolean,
    public indeterminate?: boolean,
    public parent?: IMenuNode,
  ) {}
}
