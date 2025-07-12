import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IAccount } from './model/account.module';
import { accountService } from './account.service';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule
  ],
})
export class AccountUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  accountMaster?: IAccount | undefined;

  constructor(
    private fb: FormBuilder,
    private accountService: accountService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      SERIAL_NO: [],
      GL_ACCOUNT_NATURE: ['', [Validators.required]],
      GL_SCHEDULE: ['', [Validators.required]],
      GL_GROUP: ['', [Validators.required]],
      GL_ACCOUNT_CODE: ['', [Validators.required]],
      GL_ACCOUNT_DESC: ['', [Validators.required, Validators.maxLength(100)]],
      GL_ACCOUNT_TYPE: ['OTHERS', [Validators.required]],
      GL_TYPE: ['A', [Validators.required]],
      REQ_COST_REF: ['Y', [Validators.required]],
      REQ_DOC_REF: ['Y'],
      REQ_PAID_TO: ['Y'],
      REQ_RECEIVED_FROM: ['N'],
      FUND_TRANSFER: ['Y'],
      CREDIT_ALLOWED: ['Y'],
      DEBIT_ALLOWED: ['Y'],
      REQREFNO: ['Y'],
      REQREFDATE: ['Y'],
      GL_OPENING_DATE: [this.getCurrentDate()],
      USE_STATUS: [''],
      CLOSING_DATE: [''],
      IsActive: [true]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.accountService.getAccountById(+id).subscribe(data => {
        if (data) {
          this.editForm.patchValue(data);
        }
      });
    }
  }

  updateAccount() {
    if (this.editForm.valid) {
      const account = this.editForm.value;
      console.log(account);
      this.accountService.updateAccount(account).subscribe(() => {
        this.router.navigate(['/account-master']);
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
