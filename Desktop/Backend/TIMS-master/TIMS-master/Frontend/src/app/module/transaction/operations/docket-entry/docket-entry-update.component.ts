// docket-entry-update.component.ts
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgForOf, NgIf} from '@angular/common';
import {DocketCft, IDocketCft} from './model/docket-cft.model';
import {DocketEway, IDocketEway} from './model/docket-eway.model';
import {DocketEwayPart} from './model/docket-part-detail.model';

@Component({
  selector: 'app-docket-entry-update',
  templateUrl: './docket-entry-update.component.html',
  imports: [
    ReactiveFormsModule,
    MatTooltipModule,
    NgForOf,

    FormsModule,
    NgIf
  ],
  //styleUrls: ['./docket-entry-update.component.scss']
})
export class DocketEntryUpdateComponent {
  editForm!: FormGroup;
  docketCft:IDocketCft[]=[];
  docketEway:IDocketEway[]=[];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      docketNo: [''],
      bookingDate: [this.getCurrentDate()],
      bookingMode: [''],
      serviceMode: [''],
      bookingBasis: [''],
      chequeBy: [''],
      pickupBy: [''],
      eod: [''],

      delvBranch: [''],
      pinCode: [],
      distance: [{value:'',disabled:true}],
      odaLoc: [{value:'',disabled:true}],
      delvType: [],

      consignorCode: [''],
      consignorName: [{value:'',disabled:true}],
      consignorAddress: [{value:'',disabled:true}],
      consignorPhone: [{value:'',disabled:true}],
      consignorMobile: [{value:'',disabled:true}],
      consignorEmail: [{value:'',disabled:true}],

      consigneeCode: [''],
      consigneeName: [{value:'',disabled:true}],
      consigneeAddress: [{value:'',disabled:true}],
      consigneePhone: [{value:'',disabled:true}],
      consigneeMobile: [{value:'',disabled:true}],
      consigneeEmail: [{value:'',disabled:true}],

      billingPartyCode: [''],
      billingPartyName: [{value:'',disabled:true}],
      billingPartyAddress: [{value:'',disabled:true}],
      billingPartyPhone: [{value:'',disabled:true}],
      billingPartyMobile: [{value:'',disabled:true}],
      billingPartyEmail: [{value:'',disabled:true}],
      noOfInvoices:[0],
      markingBy:[''],
      pickupDate:[this.getCurrentDate()],
      totalPkgs:[{value:'',disabled:true}],
      actualWeight:[''],
      cftWeight:[{value:'',disabled:true}],
      chargeableWeight:[{value:'',disabled:true}],
      packing:[''],
      material:[''],
      privateMark:[''],
      content:[''],
      pickupReqNo:[''],
      dcNo:[''],
      remarks:[''],
      prepareBy:[''],
    });
  }

  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // 'yyyy-MM-dd'
  }
  updateEntry(): void {
    if (this.editForm.valid) {
      console.log('Form submitted:', this.editForm.value);
      // Save logic here
    }
  }

  previousState(): void {
    this.router.navigate(['/docket-entry']);
  }
  addRow():void{
    if (this.docketCft ) {
      const docet = new DocketCft();
      this.docketCft .push(docet);
    } else {
      this.docketCft  = [];
      const docet = new DocketCft();
      this.docketCft .push(docet);
    }
  }
  removeCft(index:number)
  {
    this.docketCft.splice(index,1);
  }
  addEwayRow():void{
    const noOfInvoices=this.editForm.get("noOfInvoices")?.value;
    let strt=0;
    if(this.docketEway)
    {
      strt=this.docketEway.length;
    }
    if(noOfInvoices<strt)
    {
      this.docketEway.splice(noOfInvoices,strt-noOfInvoices);
    }
    for (let i = strt; i < noOfInvoices; i++) {
      if (this.docketEway ) {
        const eway = new DocketEway();
        this.docketEway.push(eway);
      } else {
        this.docketEway  = [];
        const eway = new DocketEway();
        this.docketEway.push(eway);
      }
    }

  }
  removeEway(index:number)
  {
    this.docketEway.splice(index,1);
  }
  changeExpand(beans: IDocketEway, vl: boolean) {
    beans.expanded = vl;
    if(!beans.partDetails || (beans.partDetails.length<=0))
    {
      beans.partDetails = [];
      const dePart=new DocketEwayPart();
      beans.partDetails.push(new DocketEwayPart());
    }
  }
  addPart(beans: IDocketEway) {
    if(!beans.partDetails || (beans.partDetails.length<=0))
    {
      beans.partDetails = [];
      const dePart=new DocketEwayPart();
      beans.partDetails.push(new DocketEwayPart());
    }
    else
    {
      const dePart=new DocketEwayPart();
      beans.partDetails.push(new DocketEwayPart());
    }
  }
  removePart(beans: IDocketEway,index:number)
  {
    if(  beans.partDetails) {
      beans.partDetails.splice(index, 1);
    }
  }
}

