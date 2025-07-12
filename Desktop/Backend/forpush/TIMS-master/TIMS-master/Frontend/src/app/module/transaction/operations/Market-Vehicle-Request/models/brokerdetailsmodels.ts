export interface IBrokerDetails {
  BrokerName?: string;
  Address?: number;
  Contact?: string;
  PanNo?:any;
  PanName?:string;
  AccNo?:string;
  BankNo?:any;
  IfseCode?:any;
  BrokerRate?:any;
  Advance?:any;
  Remark?:string;
  GpsLinks?:string;
  GpsId?:string;
  GpsPass?:string;



}

export class brokerdetails implements IBrokerDetails {
  

  BrokerName?: string;
  Address?: number;
  Contact?: string;
  PanNo?:any;
  PanName?:string;
  AccNo?:string;
  BankNo?:any;
  IfseCode?:any;
  BrokerRate?:any;
  Advance?:any;
  Remark?:string;
  GpsLinks?:string;
  GpsId?:string;
  GpsPass?:string;
  isActive: string | undefined;

//testing
  constructor(init?: Partial<IBrokerDetails>) {
      Object.assign(this, init);
    }
  
}
