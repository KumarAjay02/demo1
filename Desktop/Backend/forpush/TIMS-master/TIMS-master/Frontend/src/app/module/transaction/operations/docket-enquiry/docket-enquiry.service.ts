import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBILL_DTLS, ICHALLAN_DTLS, IDELIVERY_DTLS, IDWB_DTLS, IDWB_MSTS, IFREIGHT_DTLS, IINV_DTLS, IPOD_DTLS } from './model/docket-enquiry.model';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { DocketEnquirySearch, IDocketEnquirySearch } from './model/docket-enquiry-search.model';

@Injectable({ providedIn: 'root' })
export class DocketEnquiryService {

  private dwbMsts: IDWB_MSTS[] = [
    {
      DWBNO: 11457720, DWB_DATE: '08 Aug 2024', ORIGIN: 'GGN', DESTINATION: 'BNG', PAYMENT_TYPE: 'BOD', PRODUCT_CODE: 'ROAD', MATERIAL: 'AUTO', ACTUALWEIGHT: '221.00', CHARGABLE_WEIGHT: '221.00', COD: '0', TOTAL_PCS: '11', CURRLOC: 'Customer', STATUS: 'Delivered', REMARKS: ''
    },
  ];
  private dwbDtls: IDWB_DTLS[] = [
    {
      Id: 1,
      Consignor: 'FIEM INDUSTRIES LIMITED',
      ConsignorAdd: '32 MILESTONE,,GT ROAD  KUNDLI',
      Consignee: 'VST TILLERS TRACTORS LIMITED { BGLR }',
      ConsigneeAdd: 'VST TILLERS TRACTORS LTD BGLR  PLOT NO-1, DYAVASANDRA INDUSTRIAL LAYOUT  WHITEFIELD MAIN ROAD, MAHADEVAPURA  BENGALURU-560048',
      BillCustomer: 'VST TILLERS TRACTORS LIMITED { UNIT :- MALUR }',
      BillCustomerAdd: 'PLOT NOS:222-224 & 229-232, 3RD PHASE,  KIADB INDUSTRIAL AREA,  MALUR 563130'
    },
  ];

  private invDtls: IINV_DTLS[] = [
    {
      Id: 1, InvoiceNo: '2401011951', INV_DATE: '08 Aug 2024', EWAYBILLNO: '301824647885', EWAYBILL_DATE: '', INV_VALUE: 77880, ConsignorPartNo: '', ConsigneePartNo: '', Quantity: 88, PalletID: '', PalletQty: 0, Location: ''
    },
  ];

  private challanDtls: ICHALLAN_DTLS[] = [
    { Id: 1, mnfhdrid: '986453', ManifestDate: '17-Aug-2024 13:40', FromBrn: 'BNGT', ToBrn: 'NSP', ManifestType: 'Local', Mode: 'ROAD', lorryid: 'KA52A9345', refno: '167985', Status: 'Received', ReceivedBy: 'ABHISHEK  SINGH', ReceiveDate: 'Aug 17 2024  6:11PM', Rec_Pkgs: '11', Remarks: '' },
    { Id: 2, mnfhdrid: '982045', ManifestDate: '10-Aug-2024 16:45', FromBrn: 'DHRT', ToBrn: 'BNGT', ManifestType: 'Route', Mode: 'ROAD', lorryid: 'MH14KQ6077', refno: '167163', Status: 'Received', ReceivedBy: 'PAWAN  KUMAR', ReceiveDate: 'Aug 17 2024 10:57AM', Rec_Pkgs: '11', Remarks: '' },
  ];

  private deliveryDtls: IDELIVERY_DTLS[] = [
    { Id: 1, mnfhdrid: '987242', ManifestDate: '19-Aug-2024 08:34', FromBrn: 'NSP', ToBrn: 'NSP', Mode: 'ROAD', lorryid: 'KA01AJ2548', refno: '169343', Status: 'Received', ReceivedBy: 'ABHISHEK  SINGH', ReceiveDate: 'Aug 27 2024 12:11PM', Remarks: '' },
  ];
  private frightDtls: IFREIGHT_DTLS[] = [
    { Id: 1, Freight: '1691', DWB: '0', FOV: '0', FOD: '0', Collection: '0', Hamali: '0', Delivery: '0', Misc: '0', EssChg: '0', Other: '' },
  ];

  private billDtls: IBILL_DTLS[] = [
    { Id: 1, BillNo: '2406304235', Branch: 'GGCO', BillDate: 'Aug 30 2024 12:00AM', BillType: 'Bill', BillCode: '12438', CustomerName: 'VST TILLERS TRACTORS LIMITED { UNIT :- MALUR }', BillAmount: '5425.00', SubDate: '2024-09-05', VchNo: '968', VchDate: '19 Oct 2024' },
  ];

  private podDtls: IPOD_DTLS[] = [
    { Id: 1, StNo: '10121696', Type: 'POD', StDate: '28-Aug-2024 00:00', From: 'NSP', To: 'GGCO', DispatchMode: 'By Courier', DispatchBy: 'RAHUL JANGRA', Vehicle_CourierNo: '0123', ReceivedBy: '3959', ReceivedDate: '2024-09-11', Status: 'Y' },
  ];

  getDocketEnquiry(): Observable<IDWB_MSTS[]> {
    return of(this.dwbMsts);
  }

  getDocketEnquiryById(id: any): Observable<IDWB_MSTS | undefined> {
    return of(this.dwbMsts.find(b => b.DWB_DATE === id));
  }


  searchDocketEnquiry(criteria: IDocketEnquirySearch): Observable<IDWB_MSTS[]> {
    return of(this.dwbMsts.filter(p => {
      const DWBNO = !criteria.DocketNo || p.DWBNO?.toString().includes(criteria.DocketNo.toLowerCase());


      return DWBNO;
    }));
  }

}
