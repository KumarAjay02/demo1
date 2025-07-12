import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StateService } from './state.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {IState} from './model/state.model';

@Component({
  selector: 'app-state-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule
  ],
  templateUrl: './state-update.component.html',
  styleUrls: ['./state-update.component.scss']
})
export class StateUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  stateMaster?: IState|undefined;
  constructor(
    private fb: FormBuilder,
    private stateService: StateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      id: [],
      code: ['', [Validators.required, Validators.maxLength(2)]],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      flag: [true]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.stateService.getStateById(+id).subscribe(state => {
        if (state) {
          this.editForm.patchValue(state);
        }
      });
    }
  }

  updateState() {
    if (this.editForm.valid) {
      const state = this.editForm.value;
      this.stateService.updateState(state).subscribe(() => {
        this.router.navigate(['/state-master']);
      });
    }
  }
  previousState(): void {
    window.history.back();
  }
  cancel(): void {
    this.router.navigate(['/states']);
  }
}
