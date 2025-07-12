import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RentAgreementService } from './rent-agreement.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import {IRentAgreement, RentAgreement} from './model/rent-agreement.model';

@Component({
  selector: 'app-rent-agreement-update',
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
  templateUrl: './rent-agreement-update.component.html'
})
export class RentAgreementUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  isViewMode = false;
  saving = false;
  financialYears: string[] = ['2023-2024', '2024-2025', '2025-2026'];
  statusOptions: string[] = ['Yes', 'No'];
  rentTypes: string[] = ['Mess', 'Warehouse', 'Labour Room', 'Office'];
  rcmOptions: string[] = ['Yes', 'No'];

  previousAgreements: IRentAgreement[] = [{
    id: 1,
    financialYear: '2024-2025',
    supplierName: 'ABC Suppliers',
    status: 'Yes',
    agreementFromDate: '2024-01-01',
    agreementToDate: '2025-12-31',
    rentType: 'Warehouse',
    areaSqft: 5000,
    noticePeriod: '3 months',
    lockingPeriod: '1 year',
    monthlyRentAmount: 50000,
    advanceAmount: 100000,
    securityDeposit: 200000,
    tdsPercentage: 10,
    gstPercentage: 18,
    rcm: 'No',
    electricityUnitRate: 8.5,
    panNo: 'ABCDE1234F',
    gstNo: '22ABCDE1234F1Z5',
    address: '123 Main St, City',
    agreementNumber: 'RA-2024-001',
    createdDate: new Date(),
    createdBy: 'admin'
  }];
  constructor(
    private fb: FormBuilder,
    private agreementService: RentAgreementService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.editForm = this.fb.group({
      id: [],
      financialYear: ['', Validators.required],
      supplierName: ['', Validators.required],
      status: ['', Validators.required],
      agreementFromDate: ['', Validators.required],
      agreementToDate: ['', Validators.required],
      rentType: ['', Validators.required],
      areaSqft: ['', Validators.required],
      noticePeriod: ['', Validators.required],
      lockingPeriod: [''],
      monthlyRentAmount: ['', Validators.required],
      advanceAmount: ['', Validators.required],
      securityDeposit: ['', Validators.required],
      tdsPercentage: [''],
      gstPercentage: [''],
      rcm: [''],
      electricityUnitRate: [''],
      panNo: [''],
      gstNo: [''],
      address: [''],
      agreementNumber: ['', Validators.required],
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
      this.agreementService.getAgreementById(+id).subscribe(agreement => {
        if (agreement) {
          this.editForm.patchValue(agreement);
          if (this.isViewMode) {
            this.editForm.disable();
          }
        }
      });
    } else {
      // Set default values for new agreement
      this.editForm.patchValue({
        financialYear: '2024-2025',
        agreementFromDate: new Date().toISOString().split('T')[0],
        agreementToDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        status: 'Yes',
        rcm: 'No'
      });
    }
  }

  save(): void {
    if (this.editForm.valid) {
      this.saving = true;
      const agreement = this.editForm.value;

      if (this.isEditMode) {
        this.agreementService.updateAgreement(agreement).subscribe({
          next: () => {
            this.toastr.success('Rent Agreement updated successfully');
            this.router.navigate(['/rent-agreements']);
          },
          error: (error) => {
            console.error('Error updating agreement:', error);
            this.toastr.error('Error updating Rent Agreement');
            this.saving = false;
          }
        });
      } else {
        this.agreementService.createAgreement(agreement).subscribe({
          next: () => {
            this.toastr.success('Rent Agreement created successfully');
            this.router.navigate(['/rent-agreements']);
          },
          error: (error) => {
            console.error('Error creating agreement:', error);
            this.toastr.error('Error creating Rent Agreement');
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
