import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LiabilityEntryService } from './liability-entry.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import {ILiabilityDetail} from './model/liability-detail.model';

@Component({
  selector: 'app-liability-entry-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    MatDialogModule,
    MatTooltipModule,
    FormsModule
  ],
  templateUrl: './liability-entry-update.component.html'
})
export class LiabilityEntryUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  isViewMode = false;
  isApprovalMode = false;
  finalPaymentHeader='FINAL PAYMENT'
  saving = false;
  mainTabText='';
  financialYears: string[] = ['2023-2024', '2024-2025', '2025-2026'];
  billTypes: string[] = ['Service', 'Goods', 'Expense'];
  liabilityTypes: string[] = ['MANUAL LIABILITY INVOICE', 'AUTO LIABILITY INVOICE', 'RECURRING LIABILITY'];
  liabilityDetail:ILiabilityDetail[]=[
    {
      id: 1,
      accountCode: "ACC1001",
      costCenter: "CC101",
      baseAmount: "1000.00",
      taxesApplicable: "Yes",
      cgst: "90.00",
      sgst: "90.00",
      igst: "0.00",
      total: "1180.00"
    },
    {
      id: 2,
      accountCode: "ACC1002",
      costCenter: "CC102",
      baseAmount: "2000.00",
      taxesApplicable: "Yes",
      cgst: "180.00",
      sgst: "180.00",
      igst: "0.00",
      total: "2360.00"
    }
  ];
 
  liabilityPayment:any[]=[
    {
      id: 1,
      libNumber:'20',
      libDate:'2025-04-23',
      libType:'lbInv',
      libReference:'',
      libCostCode:'8',
      libCostCodeDescription:'8-sbl-express',
      invoiceNo: "INV-1001",
      invoiceDate: "2025-04-10",
      invoiceAmount: 12000,
      cgst: 1080,
      sgst: 1080,
      igst: 0,
      tdsAmount: 200,
      dedAmount: 150,
      totalAmount: 13990,
      totalPrepaidAmount: 5000,
      alreadyPaidAmount: 4000,
      debitNoteAmount: 1500,
      debitNoteCgstAmount: 135,
      debitNoteSgstAmount: 135,
      debitNoteIgstAmount: 0,
      finalPaymentAmount: 3120,
      liabilityAmount: 13990
    },
    {
      id: 2,
      invoiceNo: "INV-1002",
      invoiceDate: "2025-04-12",
      invoiceAmount: 15000,
      cgst: 1350,
      sgst: 1350,
      igst: 0,
      tdsAmount: 250,
      dedAmount: 180,
      totalAmount: 17070,
      totalPrepaidAmount: 6000,
      alreadyPaidAmount: 5000,
      debitNoteAmount: 1000,
      debitNoteCgstAmount: 90,
      debitNoteSgstAmount: 90,
      debitNoteIgstAmount: 0,
      finalPaymentAmount: 3890,
      liabilityAmount: 17070
    }
  ];
 
  constructor(
    private fb: FormBuilder,
    private entryService: LiabilityEntryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.editForm = this.fb.group({
      id: [],
      financialYear: ['', Validators.required],
      branchCode:[],
      billType: ['', Validators.required],
      billNumber: [''],
      billDate: ['', Validators.required],
      supplier: ['', Validators.required],
      companyType: [''],
      liabilityType: ['', Validators.required],
      liabilityDate: ['', Validators.required],
      liabilityDueDate: [''],
      roundOff:[],
      shortExcess:[],
      branchGstin:[],
      supplierGstin:[],
      inoviceNo:[],
      narration:[],
      tds:[],
      deduction:[],
      repayAmt:[],
      isRCM:[],
      createdDate: [],
      createdBy: [],
      liabilityNo:[''],
      payMode:['Bank'],
      bank:[''],
      payType:[''],
      neftNumber:[''],
      neftDate:[''],
      panNo:[''],
      paymentDate:['25-05-2025'],
      payRemarks:[''],
      liabilityType1:[]
    });
  }
 
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const mode = this.route.snapshot.url[1]?.path;

    this.isEditMode = mode === 'edit';
    this.isViewMode = mode === 'view';
    this.isApprovalMode=mode==='approve';
    console.log("app",this.isApprovalMode);
    this.mainTabText=this.isApprovalMode?"Liability Approval":"Liability Entry";

    if (id) {
      this.entryService.getEntryById(+id).subscribe((entry: { [key: string]: any; }) => {
        if (entry) {
          this.editForm.patchValue(entry);
          if (this.isViewMode) {
            this.editForm.disable();
          }
        }
      });
    } else {
      // Set default values for new entry
      this.editForm.patchValue({
        financialYear: '2024-2025',
        billDate: new Date().toISOString().split('T')[0],
        liabilityDate: new Date().toISOString().split('T')[0]
      });
    }
  }

  save(): void {
    if (this.editForm.valid) {
      this.saving = true;
      const entry = this.editForm.value;

      if (this.isEditMode) {
        this.entryService.updateEntry(entry).subscribe({
          next: () => {
            this.toastr.success('Liability entry updated successfully');
            this.router.navigate(['/liability-entries']);
          },
          error: (error: any) => {
            console.error('Error updating entry:', error);
            this.toastr.error('Error updating liability entry');
            this.saving = false;
          }
        });
      } else {
        this.entryService.createEntry(entry).subscribe({
          next: () => {
            this.toastr.success('Liability entry created successfully');
            this.router.navigate(['/liability-entries']);
          },
          error: (error: any) => {
            console.error('Error creating entry:', error);
            this.toastr.error('Error creating liability entry');
            this.saving = false;
          }
        });
      }
    }
  }

  previousState(): void {
    window.history.back();
  }
  liabilityChange(): void
  {
    console.log("hi",this.editForm.get('liabilityType1'));
    if(this.editForm.get('liabilityType1').value==="ADVANCE")
    {
      this.finalPaymentHeader= this.editForm.get('liabilityType1').value;
    }
    else {
      this.finalPaymentHeader="FINAL PAYMENT"
    }
  }

}
