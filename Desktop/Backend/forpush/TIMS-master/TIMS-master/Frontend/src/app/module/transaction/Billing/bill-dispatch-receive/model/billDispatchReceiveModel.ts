export interface IBillDispatchReceiveModel{
      id?: number;
      Co_Code?:string;
      Div_code?:string;
      invoice_branch?:string;
      customer_code?:any;
      invoice_no?:any;
      old_bill_no?:any;
      invoice_date?:Date;
      invoice_type?:string;
      invoice_amount?:string;
      invoice_taxes?:string;
      total_invoice_amount?:any;
      outstanding_amount?:string;
      dispatch_branch?:string;
      dispatch_date?:Date;
      Entry_Date?:Date;
      Entry_By?:string;
      Recieve?:Date;
      bill_dispatch_no?:string;





}

export class BillDispatchReceiveModel implements IBillDispatchReceiveModel{
    constructor(
        public   id?: number,
      public Co_Code?:string,
      public Div_code?:string,
     public  invoice_branch?:string,
       public customer_code?:any,
     public  invoice_no?:any,
       public old_bill_no?:any,
      public invoice_date?:Date,
      public invoice_type?:string,
      public invoice_amount?:string,
     public invoice_taxes?:string,
      public total_invoice_amount?:any,
      public outstanding_amount?:string,
      public dispatch_branch?:string,
     public  dispatch_date?:Date,
     public  Entry_Date?:Date,
      public Entry_By?:string,
      public Recieve?:Date,
      public bill_dispatch_no?:string,
    ){

    }
}