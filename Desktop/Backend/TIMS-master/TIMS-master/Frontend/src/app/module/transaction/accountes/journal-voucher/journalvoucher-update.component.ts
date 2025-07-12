import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IJournalVoucher, IJournalVoucherDtls, JournalVoucher, JournalVoucherDtls } from './model/journalvoucher.module';
import { journalvoucherService } from './journalvoucher.service';
import { MatTooltip } from '@angular/material/tooltip';


@Component({
  selector: 'app-journalvoucher-voucher-update',
  templateUrl: './journalvoucher-update.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, MatTooltip, FormsModule ]
})
export class journalvoucherUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  isViewMode = false;
  saving = false;
  drAmt: number = 0;
  crAmt: number = 0;
  journalvouchers: IJournalVoucher[] = [];
  journalVoucherDtls: IJournalVoucherDtls[] = [];
  

  constructor(
    private fb: FormBuilder,
    private journalvoucherService: journalvoucherService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      ID: [],
      FINANCIAL_YEAR: [2425, [Validators.required]],
      BRANCH_CODE: ['GGCO', [Validators.required]],
      DOC_TYPE: ['JNLVOU', [Validators.required]],
      DOC_NO: [269],
      DOC_DATE: [this.getCurrentDate()],
      NARRATION: 'NARRATION',
      ReversEntry: ['N']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const mode = this.route.snapshot.url[1]?.path;

    this.isEditMode = mode === 'edit';
    this.isViewMode = mode === 'view';

    if (id) {
      this.journalvoucherService.getJournalVoucherById(+id).subscribe(data => {
        if (data) {
          this.editForm.patchValue(data);
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

  updateJournalVoucher() {
    if (this.editForm.valid) {
      const journalvoucher = this.editForm.value;
      console.log(journalvoucher);
      this.journalvoucherService.updateJournalVoucher(journalvoucher).subscribe(() => {
        this.router.navigate(['/journalvoucher']);
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

  addRow(): void {
    console.log("JV", this.journalVoucherDtls);
    if (this.journalVoucherDtls) {
      const jvdtls = new JournalVoucherDtls();
      this.journalVoucherDtls.push(jvdtls);
    } else {
      this.journalVoucherDtls = [];
      const jvdtls = new JournalVoucherDtls();
      this.journalVoucherDtls.push(jvdtls);
      this.drAmt = jvdtls.DEBIT_AMOUNT;
      this.crAmt = jvdtls.CREDIT_AMOUNT;
    }
  }
  removeRow(index: number, jvDtls?: JournalVoucherDtls[]): void {
    if (jvDtls) {
      jvDtls.splice(index, 1);
    }
  }
}
