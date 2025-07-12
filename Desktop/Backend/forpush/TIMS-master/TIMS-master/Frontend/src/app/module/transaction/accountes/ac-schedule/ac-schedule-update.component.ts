import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ACScheduleService } from './ac-schedule.service';
import { IAC_Schedule } from './model/ac-schedule.model';
import { ToastrService } from 'ngx-toastr';
import {AutoComplete, AutoCompleteCompleteEvent} from 'primeng/autocomplete';
import { IAccount_Nature } from '../ac-nature/model/ac-nature.model';
 

@Component({
  selector: 'app-ac-schedule-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    AutoComplete
  ],
  templateUrl: './ac-schedule-update.component.html'
})
export class AcScheduleUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  isViewMode = false;
  saving = false;
  acNatures: IAccount_Nature[] = [];
  acScheduleMaster?: IAC_Schedule | undefined;

  constructor(
    private fb: FormBuilder,
    private acScheduleService: ACScheduleService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.editForm = this.fb.group({
      serialNo: [''],
      scheduleCode: ['', [Validators.required]],
      scheduleDesc: ['', [Validators.required, Validators.maxLength(50)]],
      status: ['ACTIVE'],
      glNature: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const mode = this.route.snapshot.url[1]?.path;

    this.isEditMode = mode === 'edit' || !id;
    this.isViewMode = mode === 'view';

    if (id) {
      this.isEditMode = true;
      this.acScheduleService.getAcScheduleById(+id).subscribe(acSchedule => {
        if (acSchedule) {
          this.editForm.patchValue({
            ...acSchedule,
            status: acSchedule.status == 'ACTIVE' ? true : false,
            glNature: acSchedule.glNature ? { glNature: acSchedule.glNature, accountNatureDesc: acSchedule.accountNatureDesc } : null,
          });
          if (this.isViewMode) {
            this.editForm.disable();
          }
        }
      });
    }
  }

  updateACSchedule() {
    if (this.editForm.valid) {
      const formValue = this.editForm.value;
      const isUpdate = !!formValue.serialNo;
      const action = isUpdate ? 'update' : 'create';

      const confirmMsg = `Are you sure you want to ${action} this Account Schedule?`;
      if (!window.confirm(confirmMsg)) {
        return; // Cancel the operation
      }

      this.saving = true;

      const acScheduleToSave = {
        ...formValue,
        glNature: formValue.glNature?.glNature ?? formValue.glNature?.accountNature,
        status: formValue.status?'ACTIVE' : 'INACTIVE',
      };

      if (!isUpdate) {
        delete acScheduleToSave.serialNo;
      }

      const request = isUpdate
        ? this.acScheduleService.updateAcSchedule(acScheduleToSave, formValue.serialNo)
        : this.acScheduleService.createAcSchedule(acScheduleToSave);

      request.subscribe({
        next: () => {

          this.toastr.success(`Account Schedule ${isUpdate ? 'updated' : 'created'} successfully`);
          this.saving = false;
          this.router.navigate(['/ac-schedule']);
        },
        error: () => {
          this.toastr.error(`Error ${isUpdate ? 'updating' : 'creating'} Account Schedule`);
          this.saving = false;
        },
      });
    }
  }
  previousState(): void {
    window.history.back();
  }

  searchNature(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    this.acScheduleService.acNatureFilter(query).subscribe(results => {
      this.acNatures = results.body ?? [];
    });
  }
}
