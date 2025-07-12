import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RentPaymentService } from './rent-payment.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import {IRentAgreement} from '../rent-liability-approval/model/rent-agreement.model';

@Component({
  selector: 'app-rent-payment-update',
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
  templateUrl: './rent-payment-update.component.html'
})
export class RentPaymentUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  isViewMode = false;
  saving = false;
  payModes: string[] = ['Bank', 'Cash'];
  payTypes: string[] = ['NEFT', 'RTGS', 'IMPS', 'Cheque'];
  branches: string[] = ['ALL', 'BR1', 'BR2', 'BR3'];
  financialYears: string[] = ['2023-2024', '2024-2025', '2025-2026'];
  rentAgreement: IRentAgreement[]=[{
    branchCode: 'BR001',
    ownerName: 'John Doe',
    rentId: 'RNT001',
    rentAmount: 25000,
    tds: 2500,
    cGST: 2250,
    sGST: 2250,
    iGST: 0,
    advance: 50000,
    deduction: 1000,
    security: 30000,
    total: 30500,
    invoiceNumber: 'INV001',
    invoiceDate: '2025-05-01',
    approved: true
  },
    {
      branchCode: 'BR002',
      ownerName: 'Jane Smith',
      rentId: 'RNT002',
      rentAmount: 30000,
      tds: 3000,
      cGST: 2700,
      sGST: 2700,
      iGST: 0,
      advance: 60000,
      deduction: 1500,
      security: 35000,
      total: 35700,
      invoiceNumber: 'INV002',
      invoiceDate: '2025-05-05',
      approved: false
    },
    {
      branchCode: 'BR003',
      ownerName: 'ACME Properties',
      rentId: 'RNT003',
      rentAmount: 20000,
      tds: 2000,
      cGST: 1800,
      sGST: 1800,
      iGST: 0,
      advance: 40000,
      deduction: 500,
      security: 25000,
      total: 25600,
      invoiceNumber: 'INV003',
      invoiceDate: '2025-05-10',
      approved: true
    }];
  constructor(
    private fb: FormBuilder,
    private paymentService: RentPaymentService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.editForm = this.fb.group({
      id: [],
      branchCode: ['ALL', Validators.required],
      financialYear: ['', Validators.required],
      fromDate: [''],
      toDate: [''],
      agreementNumber: [''],
      agreementDate: [''],
      supplierName:[''],
      paymentNumber: ['', Validators.required],
      paymentDate: ['', Validators.required],
      payMode: ['', Validators.required],
      bankOrCash: [''],
      payType: ['', Validators.required],
      accountNo: [''],
      chequeNo: [''],
      chequeDate: [''],
      finalAmount: ['', [Validators.required, Validators.min(0)]],
      payRemarks: [''],
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
      this.paymentService.getPaymentById(+id).subscribe(payment => {
        if (payment) {
          this.editForm.patchValue(payment);
          if (this.isViewMode) {
            this.editForm.disable();
          }
        }
      });
    } else {
      // Set default values for new payment
      this.editForm.patchValue({
        paymentDate: new Date().toISOString().split('T')[0]
      });
    }
  }

  save(): void {
    if (this.editForm.valid) {
      this.saving = true;
      const payment = this.editForm.value;

      if (this.isEditMode) {
        this.paymentService.updatePayment(payment).subscribe({
          next: () => {
            this.toastr.success('Rent Payment updated successfully');
            this.router.navigate(['/rent-payments']);
          },
          error: (error) => {
            console.error('Error updating payment:', error);
            this.toastr.error('Error updating Rent Payment');
            this.saving = false;
          }
        });
      } else {
        this.paymentService.createPayment(payment).subscribe({
          next: () => {
            this.toastr.success('Rent Payment created successfully');
            this.router.navigate(['/rent-payments']);
          },
          error: (error) => {
            console.error('Error creating payment:', error);
            this.toastr.error('Error creating Rent Payment');
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
