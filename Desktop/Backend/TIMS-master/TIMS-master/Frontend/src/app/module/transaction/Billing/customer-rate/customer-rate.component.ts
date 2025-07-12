import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-customer-rate-master',
  templateUrl: './customer-rate.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class CustomerRateMasterComponent implements OnInit {
  myForm!: FormGroup;

  customerRates = [
    { CopyToBranch: 'Branch A', CopyToCustomer: 'Customer X', CopyToCustomerCode: 'CX001' },
    { CopyToBranch: 'Branch B', CopyToCustomer: 'Customer Y', CopyToCustomerCode: 'CY002' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      branch: [''],
      customer: [''],
      contract: [''],
      applicable: ['Yes'],
      validFrom: [''],
      validTo: [''],
      remarks: [''],
      noOfInvoices: [1],
      rateList: this.fb.array([])
    });

    // Add one initial rate row
    this.addRateRow();
  }

  previousState(): void {
    window.history.back();
  }

  get rateList(): FormArray {
    return this.myForm.get('rateList') as FormArray;
  }

  addEwayRow(): void {
    const count = this.myForm.get('noOfInvoices')?.value || 0;
    this.rateList.clear();
    for (let i = 0; i < count; i++) {
      this.addRateRow();
    }
  }

  addRow(): void {
    this.addRateRow();
  }

  addRateRow(): void {
    this.rateList.push(this.fb.group({
      fromBranch: [''],
      toBranch: [''],
      mode: [''],
      chargeType: [''],
      minWt: [0],
      rate: [0],
      freight: [0],
      dkt: [0],
      pickup: [0],
      delivery: [0],
      fov: [0],
      toPay: [0],
      loading: [0],
      unloading: [0],
      misc: [0],
      reverseApplicable: [false]
    }));
  }

  // This matches template's (click)="removeRow(i)"
  removeRow(index: number): void {
    if (this.rateList.length > 1) {
      this.rateList.removeAt(index);
    }
  }

  removeLastRow(): void {
    const length = this.rateList.length;
    if (length > 0) {
      this.rateList.removeAt(length - 1);
    }
  }

  trackId(index: number, item: any) {
    return index;
  }

  onSubmit(): void {
    console.log(this.myForm.value);
  }
}
