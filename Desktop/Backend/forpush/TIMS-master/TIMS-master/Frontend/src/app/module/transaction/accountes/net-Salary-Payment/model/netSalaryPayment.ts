export interface inetSalaryPayment{
  
    empId?:string;
    name?:string;
    branchCode?:string;
    grossSalary?:string;
    totalDeducation?:string,
    netSalary?:string,
    otherAdvance?:string,
    totalSalary?:string,
    month?:any,
    year?:any,
    payMode?:string,
    bankDetails?:any,
    payType?:any,
    chequeNo?:any,
    chequeDate?:any,
    status?:any,
    deducationType?:string,
}

export class netSalaryPayment implements inetSalaryPayment{

    constructor(
   public empId?:string,
   public  name?:string,
   public grossSalary?:string,
   public  totalDeducation?:string,
   public netSalary?:string,
   public otherAdvance?:string,
   public totalSalary?:string,
   public month?:any,
   public year?:any,
   public payMode?:string,
   public bankDetails?:any,
   public payType?:any,
   public chequeNo?:any,
   public chequeDate?:any,
   public status?:any,
   public deducationType?:string,
    ){
        
    }

}