import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bulk-docket-freight-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './bulk-docket-update.component.html',
})
export class BulkDocketUpdateComponent implements OnInit {
  docketForm: FormGroup;
  billCustomerForm!: FormGroup;

  bookingBranches = ['Branch A', 'Branch B'];
  deliveryBranches = ['Branch X', 'Branch Y'];
  customers = [
    { code: 'CUST1', name: 'Customer 1' },
    { code: 'CUST2', name: 'Customer 2' }
  ];
  modes = ['Air', 'Road', 'Cargo'];
  billBranches: string[] = []; // Populate via API
  billCustomers: any[] = []; // { code, name }
  consigneeBranches: string[] = [];
  paymentBases: string[] = [];

  billDocketList: any[] = [{
    dwbNo: '56345451',
    basis: 'TBB',
    mode: 'ROAD',
    bkgDate: '18 May 2025',
    from: 'NSP',
    destination: 'AMD',
    consignorName: 'IFB INDUSTRIES LTD',
    consigneeName: 'TATA MOTORS PASSENGER VEHICLES LIMITED',
    billCustomer: 'IFB INDUSTRIES LTD',
    actWt: 37.00,
    chargableWeight: 100.00,
    selected: false
  },
  {
    dwbNo: '56350812',
    basis: 'TBB',
    mode: 'ROAD',
    bkgDate: '26 May 2025',
    from: 'NSP',
    destination: 'AMD',
    consignorName: 'IFB INDUSTRIES LTD',
    consigneeName: 'TATA MOTORS PASSENGER VEHICLES LIMITED',
    billCustomer: 'IFB INDUSTRIES LTD',
    actWt: 74.00,
    chargableWeight: 100.00,
    selected: false
  },
  {
    dwbNo: '56344685',
    basis: 'TBB',
    mode: 'ROAD',
    bkgDate: '28 May 2025',
    from: 'NSP',
    destination: 'AMD',
    consignorName: 'IFB INDUSTRIES LTD',
    consigneeName: 'GRAZIANO TRANSMISSIONI INDIA PVT LTD',
    billCustomer: 'IFB INDUSTRIES LTD',
    actWt: 181.00,
    chargableWeight: 181.00,
    selected: false
  },
  {
    dwbNo: '56344779',
    basis: 'TBB',
    mode: 'ROAD',
    bkgDate: '29 May 2025',
    from: 'NSP',
    destination: 'AMD',
    consignorName: 'IFB INDUSTRIES LTD',
    consigneeName: 'GRAZIANO TRANSMISSIONI INDIA PVT LTD',
    billCustomer: 'IFB INDUSTRIES LTD',
    actWt: 90.00,
    chargableWeight: 90.00,
    selected: false
  }]; // Populate after "Show"

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.docketForm = this.fb.group({
      bookingBranch: [''],
      deliveryBranch: [''],
      fromDate: [''],
      toDate: [''],
      customer: [''],
      mode: [''],
      docketList: this.fb.array([]),
    });

    this.billCustomerForm = this.fb.group({
      billBranchSearch: [''],
      billCustomerSearch: [''],
      toBranch: [''],
      fromDate: [''],
      toDate: [''],
      paymentBasis: ['']
    });

    this.addSampleDockets();
  }

  get docketList(): FormArray {
    return this.docketForm.get('docketList') as FormArray;
  }
  addSampleDockets(): void {
    const sampleData = [
      {
        lblDocketNo: '11672123',
        lblDocketDate: '10 May 2025',
        lblOrigin: 'AMD',
        lblDestination: 'NDA',
        lblPkgs: 1,
        lblQty: 1,
        lblActWt: 12,
        chWt: 20,
        chType: 'W',
        rate: 100,
        freight: 2000,
        collection: 200,
        delivery: 100,
        dktCh: 200,
        fov: 0,
        surcharge: 0,
        misc: 0,
        total: 0
      },
      {
        lblDocketNo: '11674261',
        lblDocketDate: '03 May 2025',
        lblOrigin: 'NDA',
        lblDestination: 'AMD',
        lblPkgs: 1,
        lblQty: 1,
        lblActWt: 10,
        chWt: 20,
        chType: 'W',
        rate: 100,
        freight: 0,
        collection: 0,
        delivery: 0,
        dktCh: 0,
        fov: 0,
        surcharge: 0,
        misc: 0,
        total: 0
      },
      {
        lblDocketNo: '11674495',
        lblDocketDate: '03 May 2025',
        lblOrigin: 'NDA',
        lblDestination: 'AMD',
        lblPkgs: 1,
        lblQty: 1,
        lblActWt: 20,
        chWt: 20,
        chType: 'W',
        rate: 100,
        freight: 0,
        collection: 0,
        delivery: 0,
        dktCh: 0,
        fov: 0,
        surcharge: 0,
        misc: 0,
        total: 0
      },
      {
        lblDocketNo: '11674004',
        lblDocketDate: '30 Apr 2025',
        lblOrigin: 'NDA',
        lblDestination: 'AMD',
        lblPkgs: 1,
        lblQty: 1,
        lblActWt: 30,
        chWt: 30,
        chType: 'W',
        rate: 100,
        freight: 0,
        collection: 0,
        delivery: 0,
        dktCh: 0,
        fov: 0,
        surcharge: 0,
        misc: 0,
        total: 0
      }
    ];

    sampleData.forEach((data) => {
      const row = this.fb.group({
        lblDocketNo: [data.lblDocketNo],
        lblDocketDate: [data.lblDocketDate],
        lblOrigin: [data.lblOrigin],
        lblDestination: [data.lblDestination],
        lblPkgs: [data.lblPkgs],
        lblQty: [data.lblQty],
        lblActWt: [data.lblActWt,Validators.required],
        chWt: [data.chWt, Validators.required],
        chType: [data.chType],
        rate: [data.rate],
        freight: [data.freight],
        collection: [data.collection],
        delivery: [data.delivery],
        dktCh: [data.dktCh],
        fov: [data.fov],
        surcharge: [data.surcharge],
        misc: [data.misc],
        total: [data.total],
      });

      this.docketList.push(row);
      this.calculateTotal(this.docketList.length - 1);
    });
  }

  calculateTotal(index: number): void {
    const row = this.docketList.at(index);
    const chWt = +row.get('chWt')?.value || 0;
    const rate = +row.get('rate')?.value || 0;
    // const freight = +row.get('freight')?.value || 0;
    const collection = +row.get('collection')?.value || 0;
    const delivery = +row.get('delivery')?.value || 0;
    const dktCh = +row.get('dktCh')?.value || 0;
    const fov = +row.get('fov')?.value || 0;
    const surcharge = +row.get('surcharge')?.value || 0;
    const misc = +row.get('misc')?.value || 0;

    const totalfreight = chWt * rate;
    row.get('freight')?.setValue(totalfreight);

    const total = totalfreight + collection + delivery + dktCh + fov + surcharge + misc;
    row.get('total')?.setValue(total);

  }

  copyColumn(field: string): void {
    const valueToCopy = this.docketList.at(0).get(field)?.value;
    for (let i = 1; i < this.docketList.length; i++) {
      this.docketList.at(i).get(field)?.setValue(valueToCopy);
      this.calculateTotal(i);
    }
  }

  trackId(index: number): number {
    return index;
  }
  onBranchChange(): void {
    // Implement branch-related logic here (e.g., update consigneeBranches)
    console.log('Branch changed');
  }

  toggleCustomerColumn(): void {
    // Toggle visibility logic for customer-related columns
    console.log('Toggled customer column');
  }

  toggleSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.docketList.controls.forEach((row: any) => row.patchValue({ selected: checked }));
  }

}
