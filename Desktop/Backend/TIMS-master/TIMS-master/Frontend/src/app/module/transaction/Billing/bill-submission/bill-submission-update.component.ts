// bill-submission-update.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BillSubmissionService } from './bill-submission.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import {BillService} from '../create-bill/bill.service';
import {GroupInvoice} from '../create-bill/model/group-invoice.model';

@Component({
  selector: 'app-bill-submission-update',
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
  templateUrl: './bill-submission-update.component.html'
})
export class BillSubmissionUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  isViewMode = false;
  saving = false;
  billBranches: any[] = [];
  customerName:any[]=[];
  groupInvoices:GroupInvoice[] = [
    new GroupInvoice(
      1,
      false,
      'GINV1001',
      '2025-05-01',
      'R',
      50000,
      0.00,
      59000,
      '',
      '',
      '',
      ''
    ),
    new GroupInvoice(
      2,
      false,
      'GINV1002',
      '2025-05-02',
      'W',
      80000,
      0.00,
      94400,
      '',
      '',
      '',
      ''
    )
  ];
  constructor(
    private fb: FormBuilder,
    private submissionService: BillSubmissionService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private billService: BillService,
  ) {
    this.editForm = this.fb.group({
      id: [],
      billBranch: ['', Validators.required],
      customerCodeName: ['undefined', Validators.required],
      groupInvoiceNo: [''],
      groupInvoiceDate: [''],
      invoiceBy: ['GINVOICE'],
      createdDate: [],
      searchInvoice:[],
      createdBy: []
    });
  }

  ngOnInit(): void {

    this.loadDropdownData();
    const id = this.route.snapshot.params['id'];
    const mode = this.route.snapshot.url[1]?.path;

    this.isEditMode = mode === 'edit';
    this.isViewMode = mode === 'view';

    if (id) {
      this.submissionService.getSubmissionById(+id).subscribe(sub => {
        if (sub) {
          this.editForm.patchValue(sub);
          if (this.isViewMode) {
            this.editForm.disable();
          }
        }
      });
    } else {
      // Set default values for new submission
      this.editForm.patchValue({
        invoiceDate: new Date().toISOString().split('T')[0]
      });
    }
  }
  loadDropdownData(): void {
    this.billService.getBillBranches().subscribe(branches => {
      this.billBranches = branches;
    });
    this.billService.getCustomer().subscribe(options => {
      this.customerName = options;
    });
  }

  calculateTotal(): void {
    const billAmount = this.editForm.get('billAmount')?.value || 0;
    const taxes = this.editForm.get('taxes')?.value || 0;
    this.editForm.get('totalAmount')?.setValue(billAmount + taxes);
  }

  save(): void {
    if (this.editForm.valid) {
      this.saving = true;
      const submission = this.editForm.value;

      if (this.isEditMode) {
        this.submissionService.updateSubmission(submission).subscribe({
          next: () => {
            this.toastr.success('Bill submission updated successfully');
            this.router.navigate(['/bill-submissions']);
          },
          error: (error) => {
            console.error('Error updating submission:', error);
            this.toastr.error('Error updating bill submission');
            this.saving = false;
          }
        });
      } else {
        this.submissionService.createSubmission(submission).subscribe({
          next: () => {
            this.toastr.success('Bill submission created successfully');
            this.router.navigate(['/bill-submissions']);
          },
          error: (error) => {
            console.error('Error creating submission:', error);
            this.toastr.error('Error creating bill submission');
            this.saving = false;
          }
        });
      }
    }
  }

  previousState(): void {
    window.history.back();
  }
  removeInovice(index:number)
  {
    this.groupInvoices.splice(index,1);
  }
  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.groupInvoices[index].uploadFile = file.name;

      // Optional: Handle the actual file upload here
      // e.g. send `file` to backend via FormData
    }
  }

}
