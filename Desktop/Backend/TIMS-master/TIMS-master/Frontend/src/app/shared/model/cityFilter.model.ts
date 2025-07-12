export interface ICityFilter {
  stateCode: string;
  txt?: string;
}

export class CityFilter implements ICityFilter {
  constructor(
    public stateCode: string,
    public txt?: string,
  ) {}
}
