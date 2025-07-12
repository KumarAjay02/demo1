export interface IFilter {
  txt?: string;
}

export class Filter implements IFilter {
  constructor(
    public txt?: string,
  ) {}
}
