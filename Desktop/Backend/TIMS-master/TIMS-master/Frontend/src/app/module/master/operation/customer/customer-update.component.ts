import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerService } from './customer.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatTooltip} from "@angular/material/tooltip";
import {CustomerBranch, ICustomerBranch} from './model/customer-branch.model';
import {CustomerPlant, ICustomerPlant} from './model/customer-plant.model';
 
import {ToastrService} from 'ngx-toastr';
import {AutoComplete, AutoCompleteCompleteEvent} from "primeng/autocomplete";
import { SelectionService } from '../../../../core/selection.service';
import { MasterFilterService } from '../../../../shared/services/master-filter.service';
import { IBranch } from '../../common/branch-mst/models/branch.model';
import { BranchmstService } from '../../common/branch-mst/services/branchmst.service';
import { ICity } from '../../common/city/model/city.model';
import { ICountry } from '../../common/country/model/country.model';
import { IPinCodeMaster } from '../../common/pincodemst/form/models/pincodemst.model';
import { IState } from '../../common/state/model/state.model';
 
 
declare let bootstrap: any;
@Component({
  selector: 'app-customer-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, MatTooltip, FormsModule, AutoComplete],
  templateUrl: './customer-update.component.html',
})


export class CustomerUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  isViewMode = false;
  saving = false;
  customerBranchDetails: ICustomerBranch[] = [];
  selPlants: ICustomerPlant[] = [];
  countries: ICountry[] = [];
  selBranch:IBranch|undefined;
  branches: IBranch[] = [];
  states: IState[] = [];
  cities: ICity[] = [];
  pinCodes: IPinCodeMaster[] = [];
  isBranchUpdating=false;
  typeOptions = [
    { value: 'Consignor', label: 'Consignor' },
    { value: 'Consignee', label: 'Consignee' },
    { value: 'Both', label: 'Both' }
  ];

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private selectionService: SelectionService,
    private toastr: ToastrService,
    private masterFilterService: MasterFilterService,
    private branchService: BranchmstService,
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    const {coCode,divCode,customerCode} = this.route.snapshot.params;
    const mode = this.route.snapshot.url[3]?.path;

    this.isEditMode = mode === 'edit';
    this.isViewMode = mode === 'view';
    if (coCode && divCode && customerCode) {
      this.loadCustomer(coCode, divCode, customerCode);
    }
    else {
      this.isEditMode = false;
       this.customerBranchDetails  = [];
    }
    this.searchCountry({ query: 'India' } as AutoCompleteCompleteEvent);
    this.fillBranch(this.editForm.get('detailBranch').value);
  }
  private initializeForm(): void {
    this.editForm = this.fb.group({
      coCode: [{ value: this.selectionService.company, disabled: true }, Validators.required],
      divCode: [{ value: this.selectionService.division, disabled: true }, Validators.required],
      customerCode: [{ value: [], disabled: true}],
      customerName: ['', Validators.required],
      type: ['', Validators.required],
      webSite: [''],
      isActive: ['Y'],
      billPartyStatus: ['B'],
      regStatus: ['R'],
      fcmFlag: ['N'],
      outstandingMailFlag: ['N'],
      creditDays: [],
      billingBase: [''],
      oemFlag: ['N'],
      creditDaysAir: [],
      creditDaysTrain: [],
      cPaymentType: [''],
      eInvoiceMail: ['N'],
      billBranch: [''],
      tempCustomer: ['N'],
      panNo: [''],
      taxApplicable: ['Y'],
      createdBy: [''],
      createdOn: [null],
      modifiedBy: [''],
      modifiedOn: [null],
      tradeName: ['', Validators.required],
      suntekCode: [''],
      // Branch details
      detailCoCode: [''],
      detailDivCode: [''],
      detailBranch: [{value:this.selectionService.branch,disabled:true}],
      detailBranchName: [''],
      detailCustomerDetCode: [],
      detailGstin: [''],
      detailSurcharge: [],
      detailAddress: [''],
      detailCity: [''],
      detailState: [''],
      detailCountry: [''],
      detailPinCode: [''],
      detailDealingPerson1: [''],
      detailEmail1: ['',[Validators.email]],
      detailLandlineNo1: [],
      detailMobileNo1: [],
      detailDealingPerson2: [''],
      detailEmail2: ['',[Validators.email]],
      detailMobileNo2: [],
      detailIsActive: ['Y']
    });
  }

  private loadCustomer(coCode: string, divCode: string, customerCode: number): void {
    this.customerService.getCustomerByKey(coCode, divCode, customerCode)
      .subscribe({
        next: (customer) => {
          if (customer) {
            this.editForm.patchValue(customer);
            this.customerBranchDetails = customer.customerDets || [];

            if (this.isViewMode) {
              this.editForm.disable();
            }
          }
        },
        error: (err) => {
          this.toastr.error('Failed to load customer data');
          console.error(err);
        }
      });
  }
  updateCustomer() {
    if (this.editForm.valid) {
      const formValue = this.editForm.getRawValue();
      const isUpdate = this.isEditMode;
      const action = isUpdate ? 'update' : 'create';

      const confirmMsg = `Are you sure? you want to ${action} this Customer?`;
      if (!window.confirm(confirmMsg)) {
        return;
      }
      this.saving = true;

      const customerToSave = {
        ...formValue,
        customerDets:this.getCustomerDetForSave(formValue),
      };
      if (!isUpdate) {
        delete customerToSave.id;
        delete customerToSave.serialNo;
        delete customerToSave.customerCode;
      }
      const request = isUpdate
        ? this.customerService.update(customerToSave, formValue.customerCode)
        : this.customerService.create(customerToSave);

      request.subscribe({
        next: () => {
          this.toastr.success(`Customer ${isUpdate ? 'updated' : 'created'} successfully`);
          this.saving = false;
          this.router.navigate(['/customer-master']);
        },
        error: (error) => {
          this.saving = false;
          if (error.status === 400 && error.error?.errors) {
            const errorMessages: string[] = [];
            for (const field in error.error.errors) {
              const messages = error.error.errors[field];
              errorMessages.push(...messages); // Flatten all error messages
            }
            this.toastr.error(errorMessages.join('<br>'), 'Validation Errors', {
              enableHtml: true, // Allows <br> for line breaks
              timeOut: 5000,   // Longer display time
            });
          }
          else {
            this.toastr.error(
              error.error?.message ||
              error.message ||
              'An unexpected error occurred. Please try again.'
            );
          }
        }
      });
    }
  }
 getCustomerDetForSave(formValue:any):ICustomerBranch[]
 {
   return this.customerBranchDetails.map((item)=> {
     item.state=item.stateMaster?.stateCode??'';
     item.stateName=item.stateMaster?.stateName??'';
     item.country=item.countryMaster?.countryCode??'';
     item.countryName=item.countryMaster?.countryName??'';
     item.city=item.cityMaster?.cityCode??'';
     item.cityName=item.cityMaster?.cityName??'';
     item.pinCode=item.pinCodeMaster?.pinCode??0;
     item.coCode=formValue.coCode;
     item.divCode=formValue.divCode;
     if(!this.isEditMode)
     {
       item.customerCode=null;
     }
     item.customerDet2s=this.getplantForSave(item)
     return item
   });
 }
 getplantForSave(customer:ICustomerBranch):ICustomerPlant[]
 {
   return customer.customerDet2s.map(item=>{
     item.coCode=customer.coCode??'';
     item.divCode=customer.divCode;
     item.branch=customer.branch;
     if(!this.isEditMode)
     {
       item.customerCode=null;
     }
     else {
       item.customerCode = customer.customerCode;
     }
     item.customerDetCode=customer.customerDetCode;
     return item;
   });
 }
  previousState(): void {
    window.history.back();
  }
  addRow(): void {

    if (this.customerBranchDetails ) {
      const selBranch=this.editForm.get("detailBranch")?.value;
      const branchIndex = this.customerBranchDetails.findIndex(itm=>itm.branch?.toUpperCase()==selBranch.toUpperCase());
      if(branchIndex>=0) {
        const confirmMsg = `Are you sure? you want to Update this Branch?`;
        if (!window.confirm(confirmMsg)) {
          return;
        }
        this.customerBranchDetails.splice(branchIndex,1);
        const customerBranch = this.getDetailRow();
        this.customerBranchDetails .push(customerBranch);
        this.clearDetail();
      }
      else
      {
        const confirmMsg = `Are you sure you want to Add this Branch?`;
        if (!window.confirm(confirmMsg)) {
          return;
        }
        const customerBranch = this.getDetailRow();
        this.customerBranchDetails .push(customerBranch);
        this.clearDetail();
      }

    } else {
      const confirmMsg = `Are you sure? you want to Add this Branch?`;
      if (!window.confirm(confirmMsg)) {
        return;
      }
      this.customerBranchDetails  = [];
      const customerBranch = this.getDetailRow();
      this.customerBranchDetails .push(customerBranch);
      this.clearDetail();
    }
    this.isBranchUpdating=false;
  }
  getDetailRow ():CustomerBranch
  {
    const formValue = this.editForm.getRawValue();
    const customerBranch = new CustomerBranch();
    customerBranch.coCode=formValue.coCode;
    customerBranch.divCode=formValue.coCode;
    customerBranch.branch=this.editForm.get('detailBranch')?.value
    customerBranch.customerCode=formValue.customerCode;
    customerBranch.customerDetCode=this.editForm.get('detailCustomerDetCode')?.value
    customerBranch.gstin=this.editForm.get('detailGstin')?.value
    customerBranch.surcharge=this.editForm.get('detailSurcharge')?.value
    customerBranch.address=this.editForm.get('detailAddress')?.value
    customerBranch.cityMaster=this.editForm.get('detailCity')?.value
    customerBranch.cityName=customerBranch.cityMaster?.cityName??'';
    customerBranch.stateMaster=this.editForm.get('detailState')?.value
    customerBranch.stateName=customerBranch.stateMaster?.stateName??'';
    customerBranch.countryMaster=this.editForm.get('detailCountry')?.value
    customerBranch.countryName=customerBranch.countryMaster?.countryName??'';
    customerBranch.pinCodeMaster=this.editForm.get('detailPinCode')?.value;
    customerBranch.pinCode=customerBranch.pinCodeMaster?.pinCode??0;
    customerBranch.dealingPerson1=this.editForm.get('detailDealingPerson1')?.value
    customerBranch.email1=this.editForm.get('detailEmail1')?.value
    customerBranch.landlineNo1=this.editForm.get('detailLandlineNo1')?.value
    customerBranch.mobileNo1=this.editForm.get('detailMobileNo1')?.value
    customerBranch.dealingPerson2=this.editForm.get('detailDealingPerson2')?.value
    customerBranch.email2=this.editForm.get('detailEmail2')?.value
    customerBranch.mobileNo2=this.editForm.get('detailMobileNo2')?.value
    customerBranch.isActive=this.editForm.get('detailIsActive')?.value
    customerBranch.customerDet2s=this.selPlants;
    return customerBranch;
  }
  clearDetail()
  {
    this.editForm.get('detailCoCode')?.setValue("");
    this.editForm.get('detailDivCode')?.setValue("");
    this.editForm.get('detailBranch')?.setValue("");
    this.editForm.get('detailBranchName')?.setValue("");
    this.editForm.get('detailCustomerDetCode').setValue(null);
    this.editForm.get('detailGstin')?.setValue("");
    this.editForm.get('detailSurcharge')?.setValue(null);
    this.editForm.get('detailAddress')?.setValue("");
    this.editForm.get('detailCity')?.setValue("");
    this.editForm.get('detailPinCode')?.setValue("");
    this.editForm.get('detailState')?.setValue("");
    this.editForm.get('detailDealingPerson1')?.setValue("");
    this.editForm.get('detailEmail1')?.setValue("");
    this.editForm.get('detailLandlineNo1')?.setValue(null);
    this.editForm.get('detailMobileNo1')?.setValue(null);
    this.editForm.get('detailDealingPerson2')?.setValue("");
    this.editForm.get('detailEmail2')?.setValue("");
    this.editForm.get('detailMobileNo2')?.setValue(null);
    this.editForm.get('detailIsActive')?.setValue("Y");
    this.selPlants=[];
  }
  addPlant(): void {
    if (this.selPlants) {
      const customerPlant = new CustomerPlant();
      customerPlant.isActive="Y";
      this.selPlants.push(customerPlant);
    } else {
      this.selPlants= [];
      const customerPlant = new CustomerPlant();
      customerPlant.isActive="Y";
      this.selPlants.push(customerPlant);
    }
  }
  removeCustomerDetail(index:number): void {
    const confirmMsg = `Are you sure? you want to Remove this Branch?`;
    if (!window.confirm(confirmMsg)) {
      return;
    }
    this.customerBranchDetails.splice(index,1);
  }
  removePlant(index:number,plants?:ICustomerPlant[]): void {
    const confirmMsg = `Are you sure? you want to Add this Plant?`;
    if (!window.confirm(confirmMsg)) {
      return;
    }
    if(plants)
    {
        plants.splice(index,1);
    }
  }
  LoadDetail(detail:ICustomerBranch)
  {

    this.editForm.patchValue({
      detailCoCode:detail.coCode,
      detailDivCode:detail.divCode,
      detailBranch:detail.branch,
      detailCustomerDetCode:detail.customerDetCode,
      detailGstin:detail.gstin,
      detailSurcharge: detail.surcharge,
      detailAddress: detail.address,
      detailCity: detail.cityMaster,
      detailState:detail.stateMaster,
      detailCountry:detail.countryMaster,
      detailPinCode:detail.pinCodeMaster,
      detailDealingPerson1:detail.dealingPerson1.toUpperCase(),
      detailEmail1:detail.email1,
      detailLandlineNo1:detail.landlineNo1,
      detailMobileNo1:detail.mobileNo1,
      detailDealingPerson2:detail.dealingPerson2.toUpperCase(),
      detailEmail2:detail.email2,
      detailMobileNo2:detail.mobileNo2,
      detailIsActive:detail.isActive,
    });
    if(detail.customerDet2s) {
      this.selPlants = detail.customerDet2s;
    }
    const tabTrigger = document.querySelector('#details-tab');
    const tab = new bootstrap.Tab(tabTrigger);
    tab.show();
    this.fillBranch(this.editForm.get('detailBranch').value);
    this.isBranchUpdating=true;
  }
  searchCountry(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    console.log(query);
    this.masterFilterService.countryFilter(query).subscribe(results => {
      this.countries = results.body ?? [];
      const india = this.countries.find(c => c.countryName.toUpperCase() === 'INDIA'); // Adjust property as needed
      if (india) {
        this.editForm.patchValue({ detailCountry: india }); // assuming 'country' is the form control
      }
    });
  }
  searchBranch(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    this.masterFilterService.branchFilter(query).subscribe(results => {
      this.branches = results.body ?? [];
    });
  }

  searchState(event: AutoCompleteCompleteEvent) {
    const selectedCountry = this.editForm.get('detailCountry')?.value;
    if (selectedCountry?.countryCode) {
      const query = event.query;
      this.masterFilterService.stateFilter(selectedCountry.countryCode, query).subscribe(results => {
        this.states = results.body ?? [];
      });
    }
  }
  searchCity(event: AutoCompleteCompleteEvent) {
    const selectedState = this.editForm.get('detailState')?.value;
    if (selectedState?.stateCode) {
      const query = event.query;
      this.masterFilterService.cityFilter(selectedState.stateCode, query).subscribe(results => {
        this.cities = results.body ?? [];
      });
    }
  }
  searchPinCode(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    this.masterFilterService.pinCodeFilter(query).subscribe(results => {
      this.pinCodes = results.body ?? [];
    });
  }
  searchPan(): void {
    this.checkInvalidControls();
  }
  checkInvalidControls() {
    const invalidControls = [];
    const controls = this.editForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalidControls.push(name);
        console.warn(`Control "${name}" is invalid. Errors:`, controls[name].errors);
      }
    }

    if (invalidControls.length === 0) {
      console.log('All controls are valid.');
    }

    return invalidControls;
  }
  fillBranch(branchCode:string) {
    this.branchService.getBranchByCode(branchCode).subscribe(result => {
      this.selBranch = result;
      this.editForm.get('detailBranch').setValue(result?.branchCode??'');
      this.editForm.get('detailBranchName').setValue(result?.branchName??'');
    });
  }
  onBranchSelect(branch: any) {
    this.selBranch = branch.value;
    this.editForm.get('detailBranch').setValue(this.selBranch?.branchCode??'');
  }
}
