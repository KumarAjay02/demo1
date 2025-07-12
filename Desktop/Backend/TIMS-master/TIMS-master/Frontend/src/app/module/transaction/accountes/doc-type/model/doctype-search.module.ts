// model/doctype.search.model.ts
export interface IDocTypeSearch {
  DOC_TYPE?: string;
  DOC_DETAILS?: string;
  DOC_CATG?: string;
}

export class DocTypeSearch implements IDocTypeSearch {
  constructor(
    public DOC_TYPE?: string,
    public DOC_DETAILS?: string,
    public DOC_CATG?: string
  ) { }
}
