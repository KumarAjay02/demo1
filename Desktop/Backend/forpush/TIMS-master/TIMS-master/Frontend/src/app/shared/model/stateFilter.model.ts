export interface IStateFilter {
  countryCode: string;
  txt?: string;
}

export class StateFilter implements IStateFilter {
  constructor(
    public countryCode: string,
    public txt?: string,
  ) {}
}
