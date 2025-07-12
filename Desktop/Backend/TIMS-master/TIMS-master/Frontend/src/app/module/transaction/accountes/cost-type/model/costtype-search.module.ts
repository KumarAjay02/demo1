// model/doctype.search.model.ts
export interface ICostTypeSearch {
  costCodeTypeDesc?: string;
  fileType?: string;
}

export class CostTypeSearch implements ICostTypeSearch {
  constructor(
    public costCodeTypeDesc?: string,
    public fileType?: string
  ) { }
}
