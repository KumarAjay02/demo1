export interface dNote{
    CoCode?:string;
    DivCode?:string;
    DebitNoteNO?:any;
    FinancialYear?:any;
    BranchCode?:string;
    FromDate?:any;
    ToDate?:any;
    DocType?:string;
    DocNo?:string;
    DebitNoteDate?:any;
    DebitNoteAmount?:any;
    Cgst?:any;
    Sgst?:any;
    igst?:any;
    cess?:any;
}
export class debitnote implements dNote{
constructor(
  public CoCode?:string,
  public  DivCode?:string,
  public  DebitNoteNO?:any,
  public  FinancialYear?:any,
  public   BranchCode?:string,
  public FromDate?:any,
  public ToDate?:any,
  public  DocType?:string,
  public  DocNo?:string,
  public  DebitNoteDate?:any,
  public  DebitNoteAmount?:any,
  public  Cgst?:any,
  public  Sgst?:any,
  public  igst?:any,
  public  cess?:any
    )
    {}
    
}