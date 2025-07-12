import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { hopodcoddispatchreceivedModel } from './model/hop-od-cod-dispatch-received-Model';
@Component({
  selector: 'app-hop-od-cod-dispatch-received-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, FormsModule],
  templateUrl: './hop-od-cod-dispatch-received-form.component.html',
  styleUrl: './hop-od-cod-dispatch-received-form.component.scss'
})
export class HopOdCodDispatchReceivedFormComponent {
  editForm: FormGroup;
  getDetailRow ():hopodcoddispatchreceivedModel
  {
    this.getDetailRow
    const hopdo= new hopodcoddispatchreceivedModel();
    return hopdo;
  }
}
