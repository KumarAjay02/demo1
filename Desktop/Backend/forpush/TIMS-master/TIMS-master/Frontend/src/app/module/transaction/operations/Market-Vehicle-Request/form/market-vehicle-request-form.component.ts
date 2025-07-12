import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MarketvehiclerequestservicesService } from '../services/marketvehiclerequestservices.service';
import { IvehicleApproval, marketvehiclerequestmodels } from '../models/marketvehiclerequestmodels';
import { CustomerPlant, ICustomerPlant } from '../../../../master/operation/customer/model/customer-plant.model';
import { ICustomerBranch } from '../../../../master/operation/customer/model/customer-branch.model';
@Component({
  selector: 'app-market-vehicle-request-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, FormsModule],
  templateUrl: './market-vehicle-request-form.component.html',
  styleUrl: './market-vehicle-request-form.component.scss'
})
export class MarketVehicleRequestFormComponent {
   editForm: FormGroup;
  isEditMode = false;
  //testing
  customerBranchDetails: IvehicleApproval[]=[];
  typeOptions = [
    { value: 'cngr', label: 'Consignor' },
    { value: 'cngee', label: 'Consignee' },
    { value: 'Both', label: 'Both' }
  ];
  constructor(
    private fb: FormBuilder,
    private customerService:  MarketvehiclerequestservicesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      coCode: [{value:'',disabled:true}, Validators.required],
      divCode: [{value:'',disabled:true}, Validators.required],
      customerCode: [],
      customerName: ['', Validators.required],
      type: ['', Validators.required],
      webSite: [''],
      activeState: ['Active'],
      billPartyStatus: ['N'],
      regStatus: ['U'],
    });
  }
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.customerService.getCustomerById(+id).subscribe(customer => {
        if (customer) {
          this.editForm.patchValue(customer);
        }
      });
    }
    else {
      this.isEditMode = false;
      this.customerBranchDetails  = [];
      const customerBranch = new marketvehiclerequestmodels();
      // customerBranch.isActive="Active"
      this.customerBranchDetails .push(customerBranch);
    }
  }
  updateCustomer() {
    if (this.editForm.valid) {
      const customer = this.editForm.value;
      if (this.isEditMode) {
        this.customerService.update(customer, customer.CUSTOMER_CODE).subscribe(() => {
          this.router.navigate(['/customer-master']);
        });
      } else {
        this.customerService.create(customer).subscribe(() => {
          this.router.navigate(['/customer-master']);
        });
      }
    }
  }
  previousState(): void {
    window.history.back();
  }
  addRow(): void {
    if (this.customerBranchDetails ) {
      const customerBranch = new marketvehiclerequestmodels();
      // customerBranch.isActive="Active"
      this.customerBranchDetails .push(customerBranch);
    } else {
      this.customerBranchDetails  = [];
      const customerBranch = new marketvehiclerequestmodels();
      // customerBranch.isActive="Active"
      this.customerBranchDetails .push(customerBranch);
    }
  }
  addPlant(branch:ICustomerBranch,plants?:ICustomerPlant[]): void {
    if (plants) {
      const customerPlant = new CustomerPlant();
      customerPlant.isActive="Active"
      plants.push(customerPlant);
      branch.plant=plants;
    } else {
      plants= [];
      const customerPlant = new CustomerPlant();
      customerPlant.isActive="Active"
      plants.push(customerPlant);
      branch.plant=plants;
    }
  }
 
  removerequestDetail(index:number): void {
    this.customerBranchDetails.splice(index,1);
  }
  changeExpand(beans: ICustomerBranch, vl: boolean) {
    beans.expand = vl;
  }
  removePlant(index:number,plants?:ICustomerPlant[]): void {
    if(plants)
    {
    plants.splice(index,1);
    }
  }
}
