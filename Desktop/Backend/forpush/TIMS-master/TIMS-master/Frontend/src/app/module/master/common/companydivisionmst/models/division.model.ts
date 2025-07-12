export interface IDivision {
  id?: number;
  coCode?: string;
  divCode?: string;
  divName?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  gstn?: string;
  pan?: string;
}

export class Division implements IDivision {
  constructor(
    public id?: number,
    public coCode?: string,
    public divCode?: string,
    public divName?: string,
    public address1?: string,
    public address2?: string,
    public address3?: string,
    public gstn?: string,
    public pan?: string
  ) {}
}
