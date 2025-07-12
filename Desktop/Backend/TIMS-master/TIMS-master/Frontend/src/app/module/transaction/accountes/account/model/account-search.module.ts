// model/account.search.model.ts
export interface IAccountSearch {
  GL_ACCOUNT_NATURE?: number;
  GL_SCHEDULE?: number;
  GL_GROUP?: number;
  GL_ACCOUNT_CODE?: string;
  GL_ACCOUNT_DESC?: string;
  GL_ACCOUNT_TYPE?: string;
}

export class accountSearch implements IAccountSearch {
  constructor(
    public GL_ACCOUNT_NATURE?: number,
    public GL_SCHEDULE?: number,
    public GL_GROUP?: number,
    public GL_ACCOUNT_CODE?: string,
    public GL_ACCOUNT_DESC?: string,
    public GL_ACCOUNT_TYPE?: string,
  ) { }
}
