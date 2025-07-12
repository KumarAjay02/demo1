// payable-update.component.ts
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PayableService } from './payable.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MatTooltipModule } from '@angular/material/tooltip';
 
import {CustomerBranch, ICustomerBranch} from '../customer/model/customer-branch.model';
import {IPayableBranch} from './model/payable-branch.model';
import { SelectionService } from '../../../../core/selection.service';

declare let bootstrap: any;

@Component({
  selector: 'app-payable-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, MatDialogModule, MatTooltipModule, FormsModule],
  templateUrl: './payable-update.component.html',
})
export class PayableUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  payableBranchDetails:IPayableBranch[]=[];
  typeOptions = [
    { value: 'cngr', label: 'Consignor' },
    { value: 'cngee', label: 'Consignee' },
    { value: 'Both', label: 'Both' }
  ];

  constructor(
    private fb: FormBuilder,
    private payableService: PayableService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private selectionService: SelectionService
  ) {
    this.editForm = this.fb.group({
      id: [],
      serialNo: [],
      coCode: [{value:this.selectionService.company,disabled:true}, Validators.required],
      divCode: [{value:this.selectionService.division,disabled:true}, Validators.required],
      payableForm: ['', Validators.required],
      payableId: [''],
      payableType: [''],
      payableName: ['', Validators.required],
      associationDate: [this.getCurrentDate(), Validators.required],
      activeState: ['Active', Validators.required],
      panNo: [''],
      adhaarNo: [''],
      companyType: [''],
      payableCategory: ['R', Validators.required], // R=Registered by default
      accountNo: [''],
      ifscCode: [''],
      bankName: [''],
      remarks: [''],
      deptType: [''],
      msme: ['No'], // No by default
      entryBy: [''],
      entryDate: [''],
      updatedBy: [''],
      updatedDate: [''],
      detailBranchCode:[''],
      detailBranch:[''],
      detailGstNo:[''],
      detailDealingPerson1:[''],
      detailAddress:[''],
      detailCity:[''],
      detailEmail1:[''],
      detailState:[''],
      detailPinCode:[''],
      detailLandLine1:[''],
      detailCountry:[''],
      detailDealingPerson2:[''],
      detailMobile1:[''],
      detailEmail2:[''],
      detailMobile2:[''],
      detailSurcharge:[0],
      BillPartyStatus: ['BRANCH'],
      detailIsActive:['Y'],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.payableService.getPayableById(+id).subscribe(payable => {
        if (payable) {
          this.editForm.patchValue(payable);
        }
      });
      this.payableService.getBranchList().subscribe(branchList => {
        if (branchList) {
          this.payableBranchDetails=branchList;
        }
      });
    }
    else {
      this.isEditMode = false;
    }
  }
  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // 'yyyy-MM-dd'
  }
  updatePayable() {
    if (this.editForm.valid) {
      const payableMaster = this.editForm.value;

      const payload = {
        master: payableMaster,
        // details: this.payableDetails
      };

      console.log('Saving Master + Details Payload:', payload);

      // For now simulate save
      this.payableService.update(payload.master, payload.master.Id).subscribe(() => {
        // Later: also send payload.details to backend API
        this.router.navigate(['/payable-master']);
      });
    }
  }

  previousState(): void {
    window.history.back();
  }
  addRow(): void {
    if (this.payableBranchDetails ) {
      const selBranch=this.editForm.get("detailBranch")?.value;
      const branchIndex = this.payableBranchDetails.findIndex(itm=>itm.branch?.toUpperCase()==selBranch.toUpperCase());
      if(branchIndex>=0) {
        this.payableBranchDetails.splice(branchIndex,1);
      }
      const customerBranch = this.getDetailRow();
      console.log("branch",customerBranch);
      this.payableBranchDetails .push(customerBranch);
      this.clearDetail();
    } else {
      this.payableBranchDetails  = [];
      const customerBranch = this.getDetailRow();
      console.log("branch",customerBranch);
      this.payableBranchDetails .push(customerBranch);
      this.clearDetail();
    }
  }
  getDetailRow ():CustomerBranch
  {
    const customerBranch = new CustomerBranch();
    customerBranch.branch=this.editForm.get('detailBranchCode')?.value
    customerBranch.branch=this.editForm.get('detailBranch')?.value
    customerBranch.gstin=this.editForm.get('detailGstNo')?.value
    customerBranch.dealingPerson1=this.editForm.get('detailDealingPerson1')?.value
    customerBranch.address=this.editForm.get('detailAddress')?.value
    customerBranch.city=this.editForm.get('detailCity')?.value
    customerBranch.email1=this.editForm.get('detailEmail1')?.value
    customerBranch.pinCode=this.editForm.get('detailPinCode')?.value
    customerBranch.state=this.editForm.get('detailState')?.value
    customerBranch.landlineNo1=this.editForm.get('detailLandLine1')?.value
    customerBranch.country=this.editForm.get('detailCountry')?.value
    customerBranch.dealingPerson2=this.editForm.get('detailDealingPerson2')?.value
    customerBranch.mobileNo1=this.editForm.get('detailMobile1')?.value
    customerBranch.mobileNo2=this.editForm.get('detailMobile2')?.value
    customerBranch.email2=this.editForm.get('detailEmail2')?.value
    customerBranch.surcharge=this.editForm.get('detailSurcharge')?.value
    customerBranch.isActive=this.editForm.get('detailIsActive')?.value
    return customerBranch;
  }
  clearDetail()
  {
    this.editForm.get('detailBranchCode')?.setValue("");
    this.editForm.get('detailBranch')?.setValue("");
    this.editForm.get('detailGstNo')?.setValue("");
    this.editForm.get('detailDealingPerson1')?.setValue("");
    this.editForm.get('detailAddress')?.setValue("");
    this.editForm.get('detailCity')?.setValue("");
    this.editForm.get('detailEmail1')?.setValue("");
    this.editForm.get('detailPinCode')?.setValue("");
    this.editForm.get('detailState')?.setValue("");
    this.editForm.get('detailLandLine1')?.setValue("");
    this.editForm.get('detailCountry')?.setValue("");
    this.editForm.get('detailDealingPerson2')?.setValue("");
    this.editForm.get('detailMobile1')?.setValue("");
    this.editForm.get('detailMobile2')?.setValue("");
    this.editForm.get('detailEmail2')?.setValue("");
    this.editForm.get('detailSurcharge')?.setValue(0);
    this.editForm.get('detailIsActive')?.setValue("Y");
  }

  removeCustomerDetail(index:number): void {
    this.payableBranchDetails.splice(index,1);
  }
  LoadDetail(detail:ICustomerBranch)
  {
    this.editForm.patchValue({
      detailBranchCode:detail.branch,
      detailBranch: detail.branch,
      detailGstNo: detail.gstin,
      detailDealingPerson1: detail.dealingPerson1,
      detailAddress: detail.address,
      detailCity: detail.city,
      detailEmail1:detail.email1,
      detailState:detail.state,
      detailPinCode:detail.pinCode,
      detailLandLine1:detail.landlineNo1,
      detailCountry:detail.country,
      detailDealingPerson2:detail.dealingPerson2,
      detailMobile1:detail.mobileNo1,
      detailMobile2:detail.mobileNo2,
      detailEmail2:detail.email2,
      detailSurcharge:detail.surcharge,
      detailIsActive:detail.isActive,
    });
    const tabTrigger = document.querySelector('#details-tab');
    const tab = new bootstrap.Tab(tabTrigger);
    tab.show();
  }
}
