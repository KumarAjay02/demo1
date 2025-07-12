import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IVoucherEntry, IVoucherEntrySearch, VoucherEntrySearch } from './model/voucherentry.module';
import { voucherentryService } from './voucherentry.service';

@Component({
  selector: 'app-voucherentry-voucher-update',
  templateUrl: './voucherentry-update.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule
  ],
})
export class voucherentryUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  VoucherEntryMaster?: IVoucherEntry | undefined;

  constructor(
    private fb: FormBuilder,
    private voucherentryService: voucherentryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      ID: [],
      FINANCIAL_YEAR: [2425, [Validators.required]],
      BRANCH_CODE: ['GGCO', [Validators.required]],
      DOC_TYPE: ['RECVOU', [Validators.required]],
      DOC_NO: [],
      DOC_DATE: [this.getCurrentDate()],
      PAY_MODE: ['CASH', [Validators.required]],
      PAY_TYPE: ['NEFT', [Validators.required]],
      CHEQUE_NO: [''],
      CHEQUE_DATE: [this.getCurrentDate()],
      PAID_RECEIVED_FROM: ['0', [Validators.required]],
      BANK_ACCOUNT_NO: [''],
      PAN_NO: [''],
      TSD_TYPE: [''],
      GL_CODE: [''],
      COST_CODE: [''],
      COST_CENTER: [''],
      CGST: [0],
      SGST: [0],
      IGST: [0],
      INVNO: [''],
      AMOUNT: [0],
      NARRATION: 'NARRATION'
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.voucherentryService.getVoucherEntryById(+id).subscribe(data => {
        if (data) {
          this.editForm.patchValue(data);
        }
      });
    }
  }

  updateVoucherEntry() {
    if (this.editForm.valid) {
      const account = this.editForm.value;
      console.log(account);
      this.voucherentryService.updateVoucherEntry(account).subscribe(() => {
        this.router.navigate(['/voucherentry']);
      });
    }
  }

  previousState(): void {
    window.history.back();
  }

  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // 'yyyy-MM-dd'
  }
}
