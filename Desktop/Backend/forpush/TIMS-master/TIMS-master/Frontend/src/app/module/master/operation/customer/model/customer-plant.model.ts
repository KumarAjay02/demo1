// model/payable-detail.model.ts


export interface ICustomerPlant {
  coCode?: string;
  divCode?: string;
  branch?: string;
  customerCode?: number;
  customerDetCode?: number;
  plantCode?:number;
  plantName?:string;
  plantAddress?:string;
  isActive?:string;
}

export class CustomerPlant implements ICustomerPlant {
  coCode?: string;
  divCode?: string;
  branch?: string;
  customerCode?: number;
  customerDetCode?: number;
  plantCode?:number;
  plantName?:string;
  plantAddress?:string;
  isActive?:string;

  constructor(init?: Partial<ICustomerPlant>) {
    Object.assign(this, init);
  }
}
