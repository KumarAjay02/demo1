export interface IPinCodeMaster {
  pinCode?: number;
  areaName?: string;
  cityCode?: string;
  pickupBranch?: string;
  deliveryBranch?: string;
  pickupDistance?: string;
  deliveryDistance?: string;
  odaLocation?: string;
  codService?: string;
  noEntry1From?: string;
  noEntry1To?: string;
  noEntry2From?: string;
  noEntry2To?: string;
  serialNo?: string;
  isActive?: string;
}

export class PinCodeMaster implements IPinCodeMaster {
  constructor(
    public pinCode?: number,
    public areaName?: string,
    public cityCode?: string,
    public pickupBranch?: string,
    public deliveryBranch?: string,
    public pickupDistance?: string,
    public deliveryDistance?: string,
    public odaLocation?: string,
    public codService?: string,
    public noEntry1From?: string,
    public noEntry1To?: string,
    public noEntry2From?: string,
    public noEntry2To?: string,
    public serialNo?: string,
    public isActive?: string
  ) {}
}
