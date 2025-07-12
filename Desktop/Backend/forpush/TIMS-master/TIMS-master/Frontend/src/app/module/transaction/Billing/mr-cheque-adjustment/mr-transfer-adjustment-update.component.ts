import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MrTransferAdjustmentService } from './mr-transfer-adjustment.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import {IAdjustedInvoice} from './model/adjusted-invoice.model';

@Component({
  selector: 'app-mr-transfer-adjustment-update',
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
  templateUrl: './mr-transfer-adjustment-update.component.html'
})
export class MrTransferAdjustmentUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  isViewMode = false;
  saving = false;
 
  toalCountLabel="Total: 1 bill Selected, Total outstanding Amount:17000.00";
 
  branches: string[] = ['GSCO', 'OTHER1', 'OTHER2'];
  paymentTypes: string[] = ['TYOTO:00', 'OTHER1', 'OTHER2'];
adjustedInvoices:IAdjustedInvoice[]=[{
  sNo: 1,
  checkbox: false,
  invoiceNo: 'INV001',
  invoiceDate: '2025-05-01',
  supplierBranch: 'Delhi Branch',
  supplierName: 'ABC Suppliers Pvt Ltd',
  invoiceType: 'Regular',
  billAmount: 5000,
  taxes: 900,
  totalAmount: 5900,
  outStandingAmount: 2000,
  adjustedAmount: 1000,
  tdsAmount: 100
},
  {
    sNo: 2,
    checkbox: false,
    invoiceNo: 'INV002',
    invoiceDate: '2025-05-03',
    supplierBranch: 'Mumbai Branch',
    supplierName: 'XYZ Distributors',
    invoiceType: 'Credit',
    billAmount: 7500,
    taxes: 1350,
    totalAmount: 8850,
    outStandingAmount: 3500,
    adjustedAmount: 1500,
    tdsAmount: 200
  }]


  constructor(
    private fb: FormBuilder,
    private adjustmentService: MrTransferAdjustmentService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.editForm = this.fb.group({
      id: [],
      branch: [{value:'',disabled:true}, Validators.required],
      mrNumber: ['', Validators.required],
      mrDate: [{value:'',disabled:true}, Validators.required],
      paymentType: [{value:'',disabled:true}, Validators.required],
      balanceAmt:[{value:'',disabled:true}],
      adjustmentNumber: [''],
      adjustmentDate: [''],
      createdDate: [],
      createdBy: []
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const mode = this.route.snapshot.url[1]?.path;

    this.isEditMode = mode === 'edit';
    this.isViewMode = mode === 'view';

    if (id) {
      this.adjustmentService.getAdjustmentById(+id).subscribe((adjustment: { [key: string]: any; }) => {
        if (adjustment) {
          this.editForm.patchValue(adjustment);
          if (this.isViewMode) {
            this.editForm.disable();
          }
        }
      });
    } else {
      // Set default values for new adjustment
      this.editForm.patchValue({
        mrDate: new Date().toISOString().split('T')[0],
        adjustmentDate: new Date().toISOString().split('T')[0]
      });
    }
  }

  save(): void {
    if (this.editForm.valid) {
      this.saving = true;
      const adjustment = this.editForm.value;

      if (this.isEditMode) {
        this.adjustmentService.updateAdjustment(adjustment).subscribe({
          next: () => {
            this.toastr.success('MR Cheque Entry & Adjustment updated successfully');
            this.router.navigate(['/mr-cheque-adjustments']);
          },
          error: (error: any) => {
            console.error('Error updating adjustment:', error);
            this.toastr.error('Error updating MR Cheque Entry & Adjustment');
            this.saving = false;
          }
        });
      } else {
        this.adjustmentService.createAdjustment(adjustment).subscribe({
          next: () => {
            this.toastr.success('MR Cheque Entry & Adjustment created successfully');
            this.router.navigate(['/mr-cheque-adjustments']);
          },
          error: (error: any) => {
            console.error('Error creating adjustment:', error);
            this.toastr.error('Error creating MR Cheque Entry & Adjustment');
            this.saving = false;
          }
        });
      }
    }
  }

  previousState(): void {
    window.history.back();
  }
}
