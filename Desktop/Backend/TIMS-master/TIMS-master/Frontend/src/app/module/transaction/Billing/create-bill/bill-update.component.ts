// bill-update.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BillService } from './bill.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import { IDocketEntry, DocketEntry } from '../../operations/docket-entry/model/docket-entry.model';
 

@Component({
  selector: 'app-bill-update',
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
  templateUrl: './bill-update.component.html'
})
export class BillUpdateComponent implements OnInit {
  editForm: FormGroup;
   billForm!: FormGroup;
   chargeOptions: string[] = ['Warehouse Charges', 'Labour Charges', 'Admin Cost', 'Supervisor Charges','Electricity Charges'
    ,'Security Guard Charges',
      'Other Charges',
      'Man Power Bill Charge',
      'Business Support Services',
      'Logistics Cost',
      'Other Transport Services',
      'Loading & Unloading Manpower',
      'Cartage & Stationery etc fixed'
   
   ];
  isEditMode = false;
  isViewMode = false;
  saving = false;
  billBranches: any[] = [];
  serviceModes: any[] = [];
  serviceModeswp: any[] = [];
  customerName: any[] = [];
  finanCialYear: any[] = [];
  dwbBasisOptions: any[] = [];
  docket:IDocketEntry[]=[];
branches: any;
customers: any;
taxRates: any;
  constructor(
    private fb: FormBuilder,
    private billService: BillService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.editForm = this.fb.group({
      id: [],
      billNumber: [''],
      billBranch: ['', Validators.required],
      serviceMode: ['', Validators.required],
      dwbBasis: ['', Validators.required],
      podUpload: [false],
      customerNameCode: ['', Validators.required],
      taxesApplicable: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      financialYear: ['2526', Validators.required],
      dwbUpto: ['', Validators.required],
      docketBy: ['All', Validators.required],
      searchDocket: [''],
      status: ['Active'],
      createdDate: [],
      createdBy: []
    });
    this.addDefaultRowWithValueForDocket();
  }

  ngOnInit(): void {
    this.loadDropdownData();
    this.setCurrentFinancialYear();
this.billForm = this.fb.group({
      chargeList: this.fb.array([])
    });

    this.addRow(); // initialize with one row
  
    const id = this.route.snapshot.params['id'];
    const mode = this.route.snapshot.url[1]?.path;

    this.isEditMode = mode === 'edit';
    this.isViewMode = mode === 'view';

    if (id) {
      this.billService.getBillById(+id).subscribe(bill => {
        if (bill) {
          this.editForm.patchValue(bill);
          if (this.isViewMode) {
            this.editForm.disable();
          }
        }
      });
    }
  }
get chargeList(): FormArray {
    return this.billForm.get('chargeList') as FormArray;
  }

  addRow(): void {
    this.chargeList.push(this.fb.group({
      description: ['', Validators.required],
      squareFeet: [0, Validators.required],
      rate: [0, Validators.required],
      value: [{ value: 0, disabled: true }]
    }));
  }

  onChargesChanged(index: number): void {
    const row = this.chargeList.at(index);
    const sqFeet = row.get('squareFeet')?.value || 0;
    const rate = row.get('rate')?.value || 0;
    const calculatedValue = sqFeet * rate;
    row.get('value')?.setValue(calculatedValue.toFixed(2), { emitEvent: false });
  }

  getTotalValue(): number {
    return this.chargeList.controls.reduce((total, row) => {
      const val = parseFloat(row.get('value')?.value) || 0;
      return total + val;
    }, 0);
  }
   getTotalValueCGST(): number {
    return this.chargeList.controls.reduce((total, row) => {
      const val = parseFloat(row.get('value')?.value) || 0;
      return total + (val*9)/100;
    }, 0);
  }
  getTotalValueIGST(): number {
    return this.chargeList.controls.reduce((total, row) => {
      const val = parseFloat(row.get('value')?.value) || 0;
      //return total + (val*18)/100;
      return total= 0;
    }, 0);
  }
  getTotalValueNet(): number {
    return this.chargeList.controls.reduce((total, row) => {
      const val = parseFloat(row.get('value')?.value) || 0;
      return total + val+(val*18)/100;
      
    }, 0);
  }
  loadDropdownData(): void {
    this.billService.getBillBranches().subscribe(branches => {
      this.billBranches = branches;
    });

    this.billService.getServiceModes().subscribe(modes => {
      this.serviceModes = modes;
    });

    this.billService.getServiceModeswp().subscribe(modes => {
      this.serviceModeswp = modes;
    });

    this.billService.getDwbBasisOptions().subscribe(options => {
      this.dwbBasisOptions = options;
    });
    this.billService.getFinancialYear().subscribe(options => {
      this.finanCialYear = options;
    });
    this.billService.getCustomer().subscribe(options => {
      this.customerName = options;
    });
  }

  setCurrentFinancialYear(): void {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const nextYear = (currentYear + 1).toString().slice(-2);
    const financialYear = currentYear.toString().slice(-2) + nextYear;
    this.editForm.patchValue({ financialYear });
  }

  save(): void {
    if (this.editForm.valid) {
      this.saving = true;
      const bill = this.editForm.value;

      if (this.isEditMode) {
        this.billService.updateBill(bill).subscribe({
          next: () => {
            this.toastr.success('Bill updated successfully');
            this.router.navigate(['/create-bill']);
          },
          error: (error) => {
            console.error('Error updating bill:', error);
            this.toastr.error('Error updating bill');
            this.saving = false;
          }
        });
      } else {
        this.billService.createBill(bill).subscribe({
          next: () => {
            this.toastr.success('Bill created successfully');
            this.router.navigate(['/create-bill']);
          },
          error: (error) => {
            console.error('Error creating bill:', error);
            this.toastr.error('Error creating bill');
            this.saving = false;
          }
        });
      }
    }
  }
  
 removeRow(index: number): void {
    if (this.chargeList.length > 1) {
      this.chargeList.removeAt(index);
    }
  }
  previousState(): void {
    window.history.back();
  }
  removeDocket(index:number)
  {
    this.docket.splice(index,1);
  }
  addDefaultRowWithValueForDocket(): void {
    const row = new DocketEntry(
      1,                          // id
      '1000001',                   // docketNo
      '13-05-2025',               // bookingDate
      'Road',                     // bookingMode
      'Express',                  // serviceMode
      'Regular',                  // bookingBasis
      'Consignor',                // paymentBy
      'REF123',                   // referenceNo
      'N',                        // eod
      'Delhi',                    // delvBranch
      110001,                     // pinCode
      'Connaught Place',          // delvArea
      'No',                       // odaLoc
      'Door Delivery',            // delvType
      'C001',                     // consignorCode
      'ABC Pvt Ltd',              // consignorName
      '123 Street, Delhi',        // consignorAddress
      '011-12345678',             // consignorPhone
      '9876543210',               // consignorMobile
      'abc@example.com',          // consignorEmail
      'C002',                     // consigneeCode
      'XYZ Enterprises',          // consigneeName
      '456 Avenue, Mumbai',       // consigneeAddress
      '022-87654321',             // consigneePhone
      '9123456789',               // consigneeMobile
      'xyz@example.com',          // consigneeEmail
      'C003',                     // billingPartyCode
      'Billing Corp',             // billingPartyName
      '789 Road, Chennai',        // billingPartyAddress
      '044-11223344',             // billingPartyPhone
      '9988776655',               // billingPartyMobile
      'billing@example.com',      // billingPartyEmail
      2,                          // noOfInvoices
      'John',                     // markingBy
      '2025-05-13',               // pickupDate
      5,                          // totalPkgs
      120.5,                      // actualWeight
      110.0,                      // cftWeight
      115.0,                      // chargeableWeight
      'Boxed',                    // packing
      'Electronics',              // material
      'Insurance',                // valueAddedService
      'Smartphones',              // content
      'REQ001',                   // pickupReqNo
      'DC987',                    // dcNo
      'Handle with care',         // remarks
      'SystemUser',               // prepareBy
      'Y'                         // isActive
    );

    this.docket.push(row);
  }
}
