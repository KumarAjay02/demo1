import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IBank } from './model/bank.module';
import { BankService } from './bank.service';

@Component({
  selector: 'app-bank-update',
  templateUrl: './bank-update.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule
  ]
})
export class BankUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  BankMaster?: IBank | undefined;

  constructor(
    private fb: FormBuilder,
    private bankService: BankService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      Id: [],
      BRANCH_CODE: ['', [Validators.required, Validators.maxLength(4)]],
      BANK_NAME: ['', [Validators.required, Validators.maxLength(50)]],
      BANK_ACCOUNT_CODE: ['', [Validators.required, Validators.maxLength(10)]],
      BANK_ACCOUNT_NO: ['', [Validators.required, Validators.maxLength(25)]],
      BANK_BRANCH_NAME: ['', [Validators.required, Validators.maxLength(50)]],
      IFSC_CODE: ['', [Validators.required, Validators.maxLength(11)]],
      BANK_ADDRESS: ['', [Validators.required, Validators.maxLength(100)]],
      STATE: ['', [Validators.required, Validators.maxLength(50)]],
      CITY: ['', [Validators.required, Validators.maxLength(20)]],
      PINCODE: ['', [Validators.maxLength(6)]],
      COUNTRY: ['', [Validators.maxLength(20)]],
      BANK_PHONE1: ['', [Validators.required, Validators.maxLength(10)]],
      BANK_PHONE2: ['', [Validators.maxLength(10)]],
      BANK_EMAIL: ['', [Validators.required, Validators.maxLength(150)]],
      CONTACT_PERSON_NAME: ['', [Validators.maxLength(50)]],
      CONTACT_MOBILE: ['', [Validators.maxLength(10)]],
      CONTACT_EMAIL: ['', [Validators.maxLength(150)]],
      MANAGER_NAME: ['', [Validators.maxLength(50)]],
      MANAGER_MOBILE: ['', [Validators.maxLength(10)]],
      MANAGER_EMAIL: ['', [Validators.maxLength(150)]],
      OPEN_DATE: [this.getCurrentDate()],
      CLOSE_DATE: [this.getCurrentDate()],
      CREDIT_LIMIT: ['', [Validators.maxLength(20)]],
      GUARANTEE_AMOUNT: ['', [Validators.maxLength(20)]],
      SIGNATORY_1: ['', [Validators.required, Validators.maxLength(100)]],
      SIGNATORY_2: ['', [Validators.maxLength(100)]],
      SIGNATORY_3: ['', [Validators.maxLength(100)]],
      SIGNATORY_4: ['', [Validators.maxLength(100)]],
      SIGNATORY_5: ['', [Validators.maxLength(100)]],
      JOINT_ACCOUNT: ['', [Validators.maxLength(5)]],
      IsActive: [true]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.bankService.getBankById(+id).subscribe(b => {
        if (b) {
          this.editForm.patchValue(b);
        }
      });
    }
  }
  updateBank() {
    if (this.editForm.valid) {
      const bank = this.editForm.value;
      this.bankService.updateBank(bank).subscribe(() => {
        this.router.navigate(['/bank-master']);
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
