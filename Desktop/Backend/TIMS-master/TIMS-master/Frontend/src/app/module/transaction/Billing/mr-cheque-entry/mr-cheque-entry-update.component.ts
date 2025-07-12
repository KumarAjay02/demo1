// mr-cheque-entry-update.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MrChequeEntryService } from './mr-cheque-entry.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import {BillService} from '../create-bill/bill.service';

@Component({
  selector: 'app-mr-cheque-entry-update',
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
  templateUrl: './mr-cheque-entry-update.component.html'
})
export class MrChequeEntryUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  isViewMode = false;
  saving = false;
  customerName: any[] = [];

  constructor(
    private fb: FormBuilder,
    private entryService: MrChequeEntryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private billService: BillService,
  ) {
    this.editForm = this.fb.group({
      id: [],
      branchCode: ['', Validators.required],
      customerNameCode: ['', Validators.required],
      customerName: ['', Validators.required],
      deduction: [''],
      submissionDate: ['', Validators.required],
      remarks: [''],
      payMode: ['ToPay', Validators.required],
      bank: ['State Bank of India', Validators.required],
      payType: ['NEFT', Validators.required],
      chequeDate: ['', Validators.required],
      docketNo: [''],
      amount: [0, [Validators.required, Validators.min(0)]],
      tdsReverseAmount: [0, [Validators.min(0)]],
      createdDate: [],
      createdBy: [],
      chequeNo:[''],
      multipleBranchPayment:[''],
      cancelCheque:[false],
      reSubmit:[false],
    });
  }

  ngOnInit(): void {
    this.loadDropdownData();
    const id = this.route.snapshot.params['id'];
    const mode = this.route.snapshot.url[1]?.path;

    this.isEditMode = mode === 'edit';
    this.isViewMode = mode === 'view';

    if (id) {
      this.entryService.getEntryById(+id).subscribe(entry => {
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
        submissionDate: new Date().toISOString().split('T')[0],
        chequeDate: '2025-05-15' // Default date from your image
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
            this.toastr.success('MR Cheque Entry updated successfully');
            this.router.navigate(['/mr-cheque-entries']);
          },
          error: (error) => {
            console.error('Error updating entry:', error);
            this.toastr.error('Error updating MR Cheque Entry');
            this.saving = false;
          }
        });
      } else {
        this.entryService.createEntry(entry).subscribe({
          next: () => {
            this.toastr.success('MR Cheque Entry created successfully');
            this.router.navigate(['/mr-cheque-entries']);
          },
          error: (error) => {
            console.error('Error creating entry:', error);
            this.toastr.error('Error creating MR Cheque Entry');
            this.saving = false;
          }
        });
      }
    }
  }
  loadDropdownData(): void {
    this.billService.getCustomer().subscribe(options => {
      this.customerName = options;
    });
  }
  cancelCheque(): void {
    this.editForm.patchValue({ status: 'Cancelled' });
    this.save();
  }

  resubmit(): void {
    this.editForm.patchValue({ status: 'Pending' });
    this.save();
  }

  multipleBranchPayment(): void {
    // Implement multiple branch payment logic
    this.toastr.info('Multiple Branch Payment functionality will be implemented');
  }

  previousState(): void {
    window.history.back();
  }
}
