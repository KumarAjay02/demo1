import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IContraVoucherSearch } from './model/contra-voucher-search.module';
import { contraVoucherService } from './contra-voucher.service';


@Component({
  selector: 'app-contra-voucher-update',
  templateUrl: './contra-voucher-update.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule
  ],
})
export class contraVoucherUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  ContraVoucherMaster?: IContraVoucherSearch | undefined;

  constructor(
    private fb: FormBuilder,
    private contraVoucherService: contraVoucherService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      ID: [],
      FINANCIAL_YEAR: ['2425', [Validators.required]],
      BRANCH_CODE: ['GGCO', [Validators.required]],
      DOC_TYPE: ['GLCW', [Validators.required]],
      DOC_NO: [''],
      DOC_DATE: [this.getCurrentDate()],
      PAY_TYPE: ['NEFT', [Validators.required]],
      CHEQUE_NO: [''],
      CHEQUE_DATE: [this.getCurrentDate()],
      DEBIT_ACCOUNT_NO: [],
      CREDIT_ACCOUNT_NO: [],
      AMOUNT: [],
      NARRATION: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.contraVoucherService.getContraVoucherById(+id).subscribe(data => {
        if (data) {
          this.editForm.patchValue(data);
        }
      });
    }
  }

  updateContraVoucher() {
    if (this.editForm.valid) {
      const account = this.editForm.value;
      console.log(account);
      this.contraVoucherService.updateContraVoucher(account).subscribe(() => {
        this.router.navigate(['/contra-voucher']);
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
