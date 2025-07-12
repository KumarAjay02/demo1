export interface IhopodcoddispatchreceivedModel{
  SNO?:any;
  CoCode?:string;
  Divcode?:string;
  DOCKETNO?:any;
  BOOKINGDATE?:any;
  BOOKINGBASIS?:string;
  REFERENCENO?:any;
  Type?:string;
  resendstatus?:string;
  Remarks?:string;
  RemarksDateEntry?:string;
  DispatchBranch?:string;
  DISPATCHTO?:string;
  DISPATCHMODE?:string;
  NAME?:string;
  VEHICLECOURIERNO?:string;
  STATUS?:string;
}
export class hopodcoddispatchreceivedModel implements IhopodcoddispatchreceivedModel{
    constructor(
        public CoCode?:string,
        public    Divcode?:string,
        public    DOCKETNO?:any,
        public    BOOKINGDATE?:any,
        public    BOOKINGBASIS?:string,
        public    REFERENCENO?:any,
        public    Type?:string,
        public    resendstatus?:string,
        public    Remarks?:string,
        public    RemarksDateEntry?:string,
        public    DispatchBranch?:string,
        public    DISPATCHTO?:string,
        public    DISPATCHMODE?:string,
        public    NAME?:string,
        public    VEHICLECOURIERNO?:string,
        public    STATUS?:string,
    ){
    }
}