export interface IDocketCft {
  length?: number;
  width?: number;
  height?: number;
  cft?: number;
  packages?: number;
  cftWt?: number;
}

export class DocketCft implements IDocketCft {
  constructor(
    public length?: number,
  public width?: number,
  public height?: number,
  public cft?: number,
  public packages?: number,
  public cftWt?: number,
  ) {}
}
