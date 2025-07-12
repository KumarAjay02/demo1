// docket-entry.model.ts

export interface IDocketEntry {
  id?: number;
  docketNo?: string;
  bookingDate?: string;
  bookingMode?: string;
  serviceMode?: string;
  bookingBasis?: string;
  chequeBy?: string;
  pickupBy?: string;
  eod?: string;

  delvBranch?: string;
  pinCode?: number;
  distance?: string;
  odaLoc?: string;
  delvType?: string;

  consignorCode?: string;
  consignorName?: string;
  consignorAddress?: string;
  consignorPhone?: string;
  consignorMobile?: string;
  consignorEmail?: string;

  consigneeCode?: string;
  consigneeName?: string;
  consigneeAddress?: string;
  consigneePhone?: string;
  consigneeMobile?: string;
  consigneeEmail?: string;

  billingPartyCode?: string;
  billingPartyName?: string;
  billingPartyAddress?: string;
  billingPartyPhone?: string;
  billingPartyMobile?: string;
  billingPartyEmail?: string;

  noOfInvoices?: number;
  markingBy?: string;
  pickupDate?: string;
  totalPkgs?: number;
  actualWeight?: number;
  cftWeight?: number;
  chargeableWeight?: number;
  packing?: string;
  material?: string;
  privateMark?: string;
  content?: string;
  pickupReqNo?: string;
  dcNo?: string;
  remarks?: string;
  prepareBy?: string;

  isActive?: string;
}

export class DocketEntry implements IDocketEntry {
  constructor(
    public id?: number,
    public docketNo?: string,
    public bookingDate: string = new Date().toISOString().substring(0, 10),
    public bookingMode?: string ,
    public serviceMode?: string ,
    public bookingBasis?: string,
    public chequeBy?: string ,
    public pickupBy?: string ,
    public eod?: string,

    public delvBranch?: string ,
    public pinCode?: number,
    public distance?: string ,
    public odaLoc?: string ,
    public delvType?: string,

    public consignorCode?: string ,
    public consignorName?: string ,
    public consignorAddress?: string ,
    public consignorPhone?: string,
    public consignorMobile?: string ,
    public consignorEmail?: string,

    public consigneeCode?: string,
    public consigneeName?: string,
    public consigneeAddress?: string ,
    public consigneePhone?: string ,
    public consigneeMobile?: string,
    public consigneeEmail?: string,

    public billingPartyCode?: string,
    public billingPartyName?: string ,
    public billingPartyAddress?: string,
    public billingPartyPhone?: string,
    public billingPartyMobile?: string,
    public billingPartyEmail?: string,

    public noOfInvoices?: number,
    public markingBy?: string,
    public pickupDate: string = new Date().toISOString().substring(0, 10),
    public totalPkgs?: number,
    public actualWeight?: number,
    public cftWeight?: number,
    public chargeableWeight?: number,
    public packing?: string ,
    public material?: string,
    public privateMark?: string,
    public content?: string,
    public pickupReqNo?: string,
    public dcNo?: string,
    public remarks?: string,
    public prepareBy?: string,

    public isActive?: string
  ) {}
}
