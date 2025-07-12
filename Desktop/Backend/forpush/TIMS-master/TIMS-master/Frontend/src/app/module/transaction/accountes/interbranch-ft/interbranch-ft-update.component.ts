import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IInterBranchFundTransferSearch } from './model/interbranch-ft-search.module';
import { InterBranchFundTransferService } from './interbranch-ft.service';


@Component({
  selector: 'app-interbranch-ft-voucher-update',
  templateUrl: './interbranch-ft-update.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule
  ],
})
export class InterBranchFundTransferUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  InterBranchFundTransferMaster?: IInterBranchFundTransferSearch | undefined;

  constructor(
    private fb: FormBuilder,
    private interBranchFundTransferService: InterBranchFundTransferService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      ID: [],
      FINANCIAL_YEAR: [2425, [Validators.required]],
      BRANCH_CODE: ['GGCO', [Validators.required]],
      DOC_TYPE: ['FNDTFR', [Validators.required]],
      DOC_NO: [],
      DOC_DATE: [this.getCurrentDate()],
      PAY_TYPE: ['NEFT', [Validators.required]],
      CHEQUE_NO: [''],
      CHEQUE_DATE: [this.getCurrentDate()],
      BANK_ACCOUNT_NO: [],
      NARRATION: [''],
      FROM_BRANCH: ['GGCO'],
      TO_BRANCH: [],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.interBranchFundTransferService.getInterBranchFundTransferById(+id).subscribe(data => {
        if (data) {
          this.editForm.patchValue(data);
        }
      });
    }
  }

  updateInterBranchFundTransfer() {
    if (this.editForm.valid) {
      const account = this.editForm.value;
      console.log(account);
      this.interBranchFundTransferService.updateInterBranchFundTransfer(account).subscribe(() => {
        this.router.navigate(['/interbranchfundtransfer']);
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
