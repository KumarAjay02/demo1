export interface IBranchFilter {
  txt?: string;
}

export class BranchFilter implements IBranchFilter {
  constructor(
    public txt?: string,
  ) {}
}
