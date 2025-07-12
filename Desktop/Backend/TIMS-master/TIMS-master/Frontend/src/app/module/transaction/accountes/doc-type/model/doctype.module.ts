// model/doctype.model.ts
export interface IDocType {
  Serial_No?: number;
  DOC_TYPE?: string;
  DOC_DETAILS?: string;
  DOC_CATG?: string;
  IsActive?: boolean;
  createdBy?: string;
  createdDate?: Date;
  modifiedBy?: string;
  modifiedDate?: Date;
}

export class DocType implements IDocType {
  constructor(
    public Serial_No?: number,
    public DOC_TYPE?: string,
    public DOC_DETAILS?: string,
    public DOC_CATG?: string,
    public IsActive?: boolean,
    public createdBy?: string,
    public createdDate?: Date,
    public modifiedBy?: string,
    public modifiedDate?: Date
  ) { }
}
