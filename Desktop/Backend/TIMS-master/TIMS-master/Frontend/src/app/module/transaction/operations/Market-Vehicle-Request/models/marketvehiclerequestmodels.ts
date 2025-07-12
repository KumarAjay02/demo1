export interface IvehicleApproval {
 
    // MarketVehicleRequest?:string;
    RequestNo?:string;
    RequestDate?:string;
    FromBranch?:string;
    RequirementType?:string;
    TouchingPoint?:String;
    GoodsTypes?:String;
    ActWtOfGoods?:String;
    VehicleType?:String;
    VehicleCapacity?:String;
    Remark?:String;
    detail?:String;
    expand?:boolean;
    branch?:string;
    brokerName?:string;
    contactNumber?:any;
    panCardNo?:any;
    panCardName?:string;
    accNo?:any;
    bankName?:any;
    ifseCode?:any;
    brokerRate?:any;
    advance?:any;
    remark?:any;
    gpsLinks?:any;
    gpsId?:any;
    gpsPass?:any
    address?:any
    
}
export class marketvehiclerequestmodels implements IvehicleApproval{

    // MarketVehicleRequest?:string;

    constructor(
     public RequestNo?:string,
     public RequestDate?:string,
     public FromBranch?:string,
     public ToBranch?:String,
     public  RequirementType?:string,
     public TouchingPoint?:String,
     public GoodsTypes?:String,
     public ActWtOfGoods?:String,
     public VehicleType?:String,
     public VehicleCapacity?:String,
     public Remark?:String,
     public detail?:String,
     public expand?:boolean,
     public branch?:string,
     public brokerName?:string,
     public contactNumber?:any,
     public panCardNo?:any,
     public panCardName?:string,
     public accNo?:any,
     public bankName?:any,
     public ifseCode?:any,
     public brokerRate?:any,
     public advance?:any,
     public remark?:any,
     public gpsLinks?:any,
     public gpsId?:any,
     public gpsPass?:any,
     public address?:any
        
    ){}

   

}