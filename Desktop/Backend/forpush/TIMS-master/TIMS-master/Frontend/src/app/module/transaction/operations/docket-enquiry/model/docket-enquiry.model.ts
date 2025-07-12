export interface IDWB_MSTS {
  DWBNO?: number;
  DWB_DATE?: string;
  ORIGIN?: string;
  DESTINATION?: string;
  PAYMENT_TYPE?: string;
  PRODUCT_CODE?: string;
  MATERIAL?: string;
  ACTUALWEIGHT?: string;
  CHARGABLE_WEIGHT?: string;
  COD?: string;
  TOTAL_PCS?: string;
  CURRLOC?: string;
  STATUS?: string;
  REMARKS?: string;
}

export class DWB_MSTS implements IDWB_MSTS {
  constructor(
    public DWBNO?: number,
    public DWB_DATE?: string,
    public ORIGIN?: string,
    public DESTINATION?: string,
    public PAYMENT_TYPE?: string,
    public PRODUCT_CODE?: string,
    public MATERIAL?: string,
    public ACTUALWEIGHT?: string,
    public CHARGABLE_WEIGHT?: string,
    public COD?: string,
    public TOTAL_PCS?: string,
    public CURRLOC?: string,
    public STATUS?: string,
    public REMARKS?: string,
  ) { }
}


export interface IDWB_DTLS {
  Id?: number;
  Consignor?: string;
  ConsignorAdd?: string;
  Consignee?: string;
  ConsigneeAdd?: string;
  BillCustomer?: string;
  BillCustomerAdd?: string;
}

export class DWB_DTLS implements IDWB_DTLS {
  constructor(
    public Id?: number,
    public Consignor?: string,
    public ConsignorAdd?: string,
    public Consignee?: string,
    public ConsigneeAdd?: string,
    public BillCustomer?: string,
    public BillCustomerAdd?: string,
  ) { }
}

export interface IINV_DTLS {
  Id?: number;
  InvoiceNo?: string;
  INV_DATE?: string;
  EWAYBILLNO?: string;
  EWAYBILL_DATE?: string;
  INV_VALUE?: number;
  ConsignorPartNo?: string;
  ConsigneePartNo?: string;
  Quantity?: number;
  PalletID?: string;
  PalletQty?: number;
  Location?: string;
}

export class INV_DTLS implements IINV_DTLS {
  constructor(
    public Id?: number,
    public InvoiceNo?: string,
    public INV_DATE?: string,
    public EWAYBILLNO?: string,
    public EWAYBILL_DATE?: string,
    public INV_VALUE?: number,
    public ConsignorPartNo?: string,
    public ConsigneePartNo?: string,
    public Quantity?: number,
    public PalletID?: string,
    public PalletQty?: number,
    public Location?: string,
  ) { }
}

export interface ICHALLAN_DTLS {
  Id?: number;
  mnfhdrid?: string;
  ManifestDate?: string;
  FromBrn?: string;
  ToBrn?: string;
  ManifestType?: string;
  Mode?: string;
  lorryid?: string;
  refno?: string;
  Status?: string;
  ReceivedBy?: string;
  ReceiveDate?: string;
  Rec_Pkgs?: string;
  Remarks?: string;
}

export class CHALLAN_DTLS implements ICHALLAN_DTLS {
  constructor(
    public Id?: number,
    public mnfhdrid?: string,
    public ManifestDate?: string,
    public FromBrn?: string,
    public ToBrn?: string,
    public ManifestType?: string,
    public Mode?: string,
    public lorryid?: string,
    public refno?: string,
    public Status?: string,
    public ReceivedBy?: string,
    public ReceiveDate?: string,
    public Rec_Pkgs?: string,
    public Remarks?: string,
  ) { }
}

export interface IDELIVERY_DTLS {
  Id?: number;
  mnfhdrid?: string;
  ManifestDate?: string;
  FromBrn?: string;
  ToBrn?: string;
  Mode?: string;
  lorryid?: string;
  refno?: string;
  Status?: string;
  ReceivedBy?: string;
  ReceiveDate?: string;
  Remarks?: string;
}

export class DELIVERY_DTLS implements IDELIVERY_DTLS {
  constructor(
    public Id?: number,
    public mnfhdrid?: string,
    public ManifestDate?: string,
    public FromBrn?: string,
    public ToBrn?: string,
    public Mode?: string,
    public lorryid?: string,
    public refno?: string,
    public Status?: string,
    public ReceivedBy?: string,
    public ReceiveDate?: string,
    public Remarks?: string,
  ) { }
}

export interface IFREIGHT_DTLS {
  Id?: number;
  Freight?: string;
  DWB?: string;
  FOV?: string;
  FOD?: string;
  Collection?: string;
  Hamali?: string;
  Delivery?: string;
  Misc?: string;
  EssChg ?: string;
  Other?: string;
}

export class FREIGHT_DTLS implements IFREIGHT_DTLS {
  constructor(
    public Id?: number,
    public Freight?: string,
    public DWB?: string,
    public FOV?: string,
    public FOD?: string,
    public Collection?: string,
    public Hamali?: string,
    public Delivery?: string,
    public Misc?: string,
    public EssChg?: string,
    public Other?: string
  ) { }
}

export interface IBILL_DTLS {
  Id?: number;
  BillNo?: string;
  Branch?: string;
  BillDate?: string;
  BillType?: string;
  BillCode?: string;
  CustomerName?: string;
  BillAmount?: string;
  SubDate?: string;
  VchNo?: string;
  VchDate?: string;
}

export class BILL_DTLS implements IBILL_DTLS {
  constructor(
    public Id?: number,
    public BillNo?: string,
    public Branch?: string,
    public BillDate?: string,
    public BillType?: string,
    public BillCode?: string,
    public CustomerName?: string,
    public BillAmount?: string,
    public SubDate?: string,
    public VchNo?: string,
    public VchDate?: string
  ) { }
}

export interface IPOD_DTLS {
  Id?: number;
  StNo?: string;
  Type?: string;
  StDate?: string;
  From?: string;
  To?: string;
  DispatchMode?: string;
  DispatchBy?: string;
  Vehicle_CourierNo?: string;
  ReceivedBy?: string;
  ReceivedDate?: string;
  Status?: string;
}

export class POD_DTLS implements IPOD_DTLS {
  constructor(
    public Id?: number,
    public StNo?: string,
    public Type?: string,
    public StDate?: string,
    public From?: string,
    public To?: string,
    public DispatchMode?: string,
    public DispatchBy?: string,
    public Vehicle_CourierNo?: string,
    public ReceivedBy?: string,
    public ReceivedDate?: string,
    public Status?: string,
  ) { }
}
