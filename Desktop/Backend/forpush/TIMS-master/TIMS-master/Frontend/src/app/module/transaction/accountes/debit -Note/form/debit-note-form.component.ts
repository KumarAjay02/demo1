import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { debitnote } from '../model/debitNote';
@Component({
  selector: 'app-debit-note-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, FormsModule],
  templateUrl: './debit-note-form.component.html',
  styleUrl: './debit-note-form.component.scss'
})
export class DebitNoteFormComponent {
  
  editForm: FormGroup;
  isEditMode = false;
  customerBranchDetails: debitnote[]=[];
  previousState(): void {
    window.history.back();
  }
  getDetailRow ():debitnote
  {
    //start
    const customerBranch = new debitnote();
    customerBranch.CoCode=this.editForm.get('detailCuBranchCode')?.value
    customerBranch.DivCode=this.editForm.get('detailBranchCode')?.value
    customerBranch.DebitNoteNO=this.editForm.get('detailBranch')?.value
    customerBranch.FinancialYear=this.editForm.get('detailGstNo')?.value
    // customerBranch.dealingPerson1=this.editForm.get('detailDealingPerson1')?.value
    // customerBranch.address=this.editForm.get('detailAddress')?.value
    // customerBranch.city=this.editForm.get('detailCity')?.value
    // customerBranch.eMail1=this.editForm.get('detailEmail1')?.value
    // customerBranch.pinCode=this.editForm.get('detailPinCode')?.value
    // customerBranch.state=this.editForm.get('detailState')?.value
    // customerBranch.lanLineNo=this.editForm.get('detailLandLine1')?.value
    // customerBranch.country=this.editForm.get('detailCountry')?.value
    // customerBranch.dealingPerson2=this.editForm.get('detailDealingPerson2')?.value
    // customerBranch.mobileNo=this.editForm.get('detailMobile1')?.value
    // customerBranch.mobileNo2=this.editForm.get('detailMobile2')?.value
    // customerBranch.eMail2=this.editForm.get('detailEmail2')?.value
    // customerBranch.surcharge=this.editForm.get('detailSurcharge')?.value
    // customerBranch.isActive=this.editForm.get('detailStatus')?.value
    // customerBranch.plant=this.selPlants;
    return customerBranch;
  }
  // clearDetail()
  // {
  //   this.editForm.get('detailCuBranchCode')?.setValue("");
  //   this.editForm.get('detailBranchCode')?.setValue("");
  //   this.editForm.get('detailBranch')?.setValue("");
  //   this.editForm.get('detailGstNo')?.setValue("");
  //   this.editForm.get('detailDealingPerson1')?.setValue("");
  //   this.editForm.get('detailAddress')?.setValue("");
  //   this.editForm.get('detailCity')?.setValue("");
  //   this.editForm.get('detailEmail1')?.setValue("");
  //   this.editForm.get('detailPinCode')?.setValue("");
  //   this.editForm.get('detailState')?.setValue("");
  //   this.editForm.get('detailLandLine1')?.setValue("");
  //   this.editForm.get('detailCountry')?.setValue("");
  //   this.editForm.get('detailDealingPerson2')?.setValue("");
  //   this.editForm.get('detailMobile1')?.setValue("");
  //   this.editForm.get('detailMobile2')?.setValue("");
  //   this.editForm.get('detailEmail2')?.setValue("");
  //   this.editForm.get('detailSurcharge')?.setValue(0);
  //   this.editForm.get('detailStatus')?.setValue("Active");
  //   // this.selPlants=[];
  // }
  // addPlant(): void {
  //   console.log("pl",this.selPlants);
  //   if (this.selPlants) {
  //     const customerPlant = new CustomerPlant();
  //     customerPlant.isActive="Active"
  //     this.selPlants.push(customerPlant);
  //   } else {
  //     this.selPlants= [];
  //     const customerPlant = new CustomerPlant();
  //     customerPlant.isActive="Active"
  //     this.selPlants.push(customerPlant);
  //   }
  // }


  // changes
  removeCustomerDetail(index:number): void {
    this.customerBranchDetails.splice(index,1);
  }
}
