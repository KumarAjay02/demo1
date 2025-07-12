import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TcsPaymentService } from './tcs-payment.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import { ITcs } from './model/tcs.model';

@Component({
  selector: 'app-tcs-payment-update',
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
  templateUrl: './tcs-payment-update.component.html'
})
export class TcsPaymentUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  isViewMode = false;
  saving = false;
  tcsList: ITcs[] = [
    {
      tcsNo: 191402,
      tcsDate: '22-Mar-2025',
      brokerName: 'SANGWAN CARGO MOVERS',
      lhcAmt: 600,
      advancePaid: 0,
      balance: 600,
      hamali: 0,
      extraKmAmount: 0,
      halting: 0,
      rto: 0,
      incentive: 0,
      latePenalty: 0,
      materialDamage: 0,
      otherDeduction: 0,
      totalLorryHire: 0,
      tdsAmount: 0,
      totalIncAmount: 0,
      totalDeductionAmount: 0,
      finalPaymentAmount: 0,
      selected: false
    },
    {
      tcsNo: 191403,
      tcsDate: '23-Mar-2025',
      brokerName: 'RAJ EXPRESS',
      lhcAmt: 700,
      advancePaid: 100,
      balance: 600,
      hamali: 0,
      extraKmAmount: 0,
      halting: 0,
      rto: 0,
      incentive: 0,
      latePenalty: 0,
      materialDamage: 0,
      otherDeduction: 0,
      totalLorryHire: 0,
      tdsAmount: 0,
      totalIncAmount: 0,
      totalDeductionAmount: 0,
      finalPaymentAmount: 0,
      selected: false
    }
  ];
  constructor(
    private fb: FormBuilder,
    private paymentService: TcsPaymentService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.editForm = this.fb.group({
      id: [],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      branchCode: ['', Validators.required],
      supplier: ['', Validators.required],
      mode: [''],
      bankDetails: ['', Validators.required],
      payType: ['', Validators.required],
      neftNumber: [''],
      neftDate: [''],
      narration: [''],
      createdDate: [],
      createdBy: [],
      paymentType:['ADVANCE'],
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
        fromDate: new Date().toISOString().split('T')[0],
        toDate: new Date().toISOString().split('T')[0]
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
            this.toastr.success('TCS Payment updated successfully');
            this.router.navigate(['/tcs-payments']);
          },
          error: (error) => {
            console.error('Error updating payment:', error);
            this.toastr.error('Error updating TCS payment');
            this.saving = false;
          }
        });
      } else {
        this.paymentService.createPayment(payment).subscribe({
          next: () => {
            this.toastr.success('TCS Payment created successfully');
            this.router.navigate(['/tcs-payments']);
          },
          error: (error) => {
            console.error('Error creating payment:', error);
            this.toastr.error('Error creating TCS payment');
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
