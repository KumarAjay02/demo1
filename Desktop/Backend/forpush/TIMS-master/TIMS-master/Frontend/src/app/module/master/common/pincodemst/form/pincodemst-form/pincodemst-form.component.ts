import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-pincodemst-form',
  imports: [RouterLink],
  templateUrl: './pincodemst-form.component.html',
  styleUrl: './pincodemst-form.component.css'
})
export class PincodemstFormComponent {
  editForm: FormGroup;
  constructor(private fb: FormBuilder,)
  {
    this.editForm = this.fb.group({

    })
  }

}
