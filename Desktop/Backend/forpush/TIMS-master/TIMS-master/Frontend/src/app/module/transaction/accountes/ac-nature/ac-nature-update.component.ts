import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IAccount_Nature } from './model/ac-nature.model';
import { AcNatureService } from './ac-nature.service';
import { ToastrService } from 'ngx-toastr';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';


@Component({
  selector: 'app-ac-nature-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule],
  templateUrl: './ac-nature-update.component.html'
})
export class AcNatureUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  isViewMode = false;
  saving = false;
  acNatures: IAccount_Nature[] = [];

  constructor(
    private fb: FormBuilder,
    private acNatureService: AcNatureService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.editForm = this.fb.group({
      //serial_No: [{ value: '', disabled: !this.saving }],
      serialNo:[],
      accountNature: [0],
      accountNatureDesc: ['', [Validators.required, Validators.maxLength(100)]],
      isActive: ['Y']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const mode = this.route.snapshot.url[1]?.path;

    this.isEditMode = mode === 'edit' || !id;
    this.isViewMode = mode === 'view';

    if (id) {
      this.isEditMode = true;
      this.acNatureService.getAcNatureById(+id).subscribe(acNature => {
        if (acNature) {
          this.editForm.patchValue({
            ...acNature,
            isActive: acNature.isActive ? true : false
          });
          if (this.isViewMode) {
            this.editForm.disable();
          }
        }
      });
    }
  }

  updateAcNature() {
    if (this.editForm.valid) {
      const formValue = this.editForm.value;
      const isUpdate = !!formValue.serialNo;
      const action = isUpdate ? 'update' : 'create';

      const confirmMsg = `Are you sure you want to ${action} this Account Nature?`;
      if (!window.confirm(confirmMsg)) {
        return; // Cancel the operation
      }

      this.saving = true;

      const acNatureToSave = {
        ...formValue,
        isActive: formValue.isActive ? 'Y' : 'N'
      };

      if (!isUpdate) {
        //delete acNatureToSave.accountNature;
        delete acNatureToSave.serialNo;
      }

      const request = isUpdate
        ? this.acNatureService.updateAcNature(acNatureToSave, formValue.accountNature)
        : this.acNatureService.createAcNature(acNatureToSave);

      request.subscribe({
        next: () => {

          this.toastr.success(`Account Nature ${isUpdate ? 'updated' : 'created'} successfully`);
          this.saving = false;
          this.router.navigate(['/ac-nature']);
        },
        error: () => {
          this.toastr.error(`Error ${isUpdate ? 'updating' : 'creating'} Account Nature`);
          this.saving = false;
        },
      });
    }
  }
  previousState(): void {
    window.history.back();
  }

}
