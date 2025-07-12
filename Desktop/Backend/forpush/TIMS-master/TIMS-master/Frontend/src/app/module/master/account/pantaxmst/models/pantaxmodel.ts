  

export class PanTaxSpecial {

  
       PanNumber?:string;
    PanNumberCode?:string;
    Status?:string;

}

export interface PantaxModels extends PanTaxSpecial{
   panNumberCode?:string;
    Tax_rate?:number;
    AccountCode?:string;
    Financial_Year?:number;
    Status?:string;
}