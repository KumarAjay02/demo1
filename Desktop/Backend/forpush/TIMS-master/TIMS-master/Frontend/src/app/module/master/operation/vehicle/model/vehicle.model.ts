// model/vehicle.model.ts
export interface IVehicle {
  id?: number;
  coCode?: string;
  divCode?: string;
  vehicleNo?: string;
  chasisNo?: string;
  engineNo?: string;
  ownerName?: string;
  mobileNo?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  actualCapacity?: string;
  caringCapacity?: string;
  flag?:boolean;
}

export class Vehicle implements IVehicle {
  constructor(
    public id?: number,
    public coCode?: string,
    public divCode?: string,
    public vehicleNo?: string,
    public chasisNo?: string,
    public engineNo?: string,
    public ownerName?: string,
    public mobileNo?: string,
    public vehicleModel?: string,
    public vehicleYear?: string,
    public actualCapacity?: string,
    public caringCapacity?: string,
    public flag?:boolean,
  ) {}
}
