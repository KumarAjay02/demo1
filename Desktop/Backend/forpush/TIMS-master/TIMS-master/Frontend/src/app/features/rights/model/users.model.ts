export interface IUsers {
  id?: number;
  user?: string;
  login?: string;
}
export class Users implements IUsers {
  constructor(
    public id?: number,
    public user?: string,
    public login?: string
  ) { }

}
