// payable-detail-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPayableDetail } from './model/payable-detail.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-payable-detail-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule,   
    MatFormFieldModule,   
    MatInputModule,       
    MatButtonModule ],
  templateUrl: './payable-detail-dialog.component.html'
})
export class PayableDetailDialogComponent {
  detailForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PayableDetailDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { masterCoCode: string; masterDivCode: string; masterPayableForm: string; masterPayableId: string; detailToEdit?: IPayableDetail; }
  ) {
    this.detailForm = this.fb.group({
      branchCode: ['', Validators.required],
      gstNo: [''],
      address: [''],
      address2: [''],
      city: [''],
      pincode: [''],
      state: [''],
      country: [''],
      contactPerson: [''],
      mobile1: ['', Validators.required],
      mobile2: [''],
      emailId: [''],
      activeStatus: ['Active', Validators.required]
    });
    if (this.data.detailToEdit) {
      this.detailForm.patchValue(this.data.detailToEdit);
    }
  }

  save(): void {
    if (this.detailForm.valid) {
      const detail: IPayableDetail = {
        coCode: this.data.masterCoCode,
        divCode: this.data.masterDivCode,
        payableForm: this.data.masterPayableForm,
        payableId: this.data.masterPayableId,
        ...this.detailForm.value,
        entryDate: new Date(),
        entryBy: 'admin'
      };
      this.dialogRef.close(detail);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
