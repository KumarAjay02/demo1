import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { debitnote } from '../../accountes/debit -Note/model/debitNote';
import { netSalaryPayment } from '../../accountes/net-Salary-Payment/model/netSalaryPayment';

@Component({
  selector: 'app-bill-dispatch-receive',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, FormsModule],
  templateUrl: './bill-dispatch-receive.component.html',
  styleUrl: './bill-dispatch-receive.component.scss'
})
export class BillDispatchReceiveComponent {

  name:string='BILL DISPATCH AND  RECEIVE';
  editForm: FormGroup;

  customerBranchDetails: netSalaryPayment[]=[];

  getDetailRow ():debitnote
  {

    const customerBranch = new debitnote();
    return customerBranch;
  }
  

}
