import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RouterModule } from '@angular/router';
import { debitnote } from '../../debit -Note/model/debitNote';
import { netSalaryPayment } from '../model/netSalaryPayment';

@Component({
  selector: 'app-net-salaryt-payment',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, FormsModule],
  templateUrl: './net-salaryt-payment.component.html',
  styleUrl: './net-salaryt-payment.component.scss'
})
export class NetSalarytPaymentComponent {

  
   
  editForm: FormGroup;

  customerBranchDetails: netSalaryPayment[]=[];

  getDetailRow ():debitnote
  {

    const customerBranch = new debitnote();
    return customerBranch;
  }
 

}
