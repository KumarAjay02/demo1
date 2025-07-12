import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChallanService } from './challan.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import {IDocketEway} from '../docket-entry/model/docket-eway.model';
import {DocketEntry, IDocketEntry} from '../docket-entry/model/docket-entry.model';
import { StateStorageService } from '../../../../core/auth/state-storage.service';
 

@Component({
  selector: 'app-drs-close',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, MatDialogModule, MatTooltipModule, FormsModule],
  templateUrl: './drs-close.component.html',
  styleUrls: ['./challan-update.component.scss']
})
export class DrsCloseComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  docket:IDocketEntry[]=[];
  isFocused:boolean;
  mode?:string;
  selChallanType?:string;
  selBranch:string | null;
  constructor(
    private fb: FormBuilder,
    private challanService: ChallanService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private stateStorageService: StateStorageService
  ) {
      this.selBranch=this.stateStorageService.getSelBranch();
    this.editForm = this.fb.group({
      challanType:[''],
      id: [{value:'', disabled:true}],
      dDate: [{value:'', disabled:true}],
      dVehicleNumber: [{value:'', disabled:true}],
      remark:[{value:'', disabled:true}],
      entryBy: [''],
      entryDate: [''],
      updatedBy: [''],
      updatedDate: [''],
    });
    this.addDefaultRowWithValueForDocket();
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const operationMode = params.get('mode');
      if (operationMode !== null) {
        this.mode=operationMode;
      }
    });
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.challanService.getChallanById(id).subscribe(challan => {
        if (challan) {
          this.editForm.patchValue(challan);
        }
      });
    } else {
      this.isEditMode = false;
    }
  }

  updateChallan() {
    if (this.editForm.valid) {
      const challan = this.editForm.value;

      if (this.isEditMode) {
        this.challanService.update(challan).subscribe(() => {
          this.router.navigate(['/challan-master']);
        });
      } else {
        this.challanService.create(challan).subscribe(() => {
          this.router.navigate(['/challan-master']);
        });
      }
    }
  }

  previousState(): void {
    window.history.back();
  }
  removeDocket(index:number)
  {
    this.docket.splice(index,1);
  }
  addDefaultRowWithValueForDocket(): void {
    const row = new DocketEntry(
      1,                          // id
      '1000001',                   // docketNo
      '13-05-2025',               // bookingDate
      'Road',                     // bookingMode
      'Express',                  // serviceMode
      'Regular',                  // bookingBasis
      'Consignor',                // paymentBy
      'REF123',                   // referenceNo
      'N',                        // eod
      'Delhi',                    // delvBranch
      110001,                     // pinCode
      'Connaught Place',          // delvArea
      'No',                       // odaLoc
      'Door Delivery',            // delvType
      'C001',                     // consignorCode
      'ABC Pvt Ltd',              // consignorName
      '123 Street, Delhi',        // consignorAddress
      '011-12345678',             // consignorPhone
      '9876543210',               // consignorMobile
      'abc@example.com',          // consignorEmail
      'C002',                     // consigneeCode
      'XYZ Enterprises',          // consigneeName
      '456 Avenue, Mumbai',       // consigneeAddress
      '022-87654321',             // consigneePhone
      '9123456789',               // consigneeMobile
      'xyz@example.com',          // consigneeEmail
      'C003',                     // billingPartyCode
      'Billing Corp',             // billingPartyName
      '789 Road, Chennai',        // billingPartyAddress
      '044-11223344',             // billingPartyPhone
      '9988776655',               // billingPartyMobile
      'billing@example.com',      // billingPartyEmail
      2,                          // noOfInvoices
      'John',                     // markingBy
      '2025-05-13',               // pickupDate
      5,                          // totalPkgs
      120.5,                      // actualWeight
      110.0,                      // cftWeight
      115.0,                      // chargeableWeight
      'Boxed',                    // packing
      'Electronics',              // material
      'Insurance',                // valueAddedService
      'Smartphones',              // content
      'REQ001',                   // pickupReqNo
      'DC987',                    // dcNo
      'Handle with care',         // remarks
      'SystemUser',               // prepareBy
      'Y'                         // isActive
    );

    this.docket.push(row);
  }
}
