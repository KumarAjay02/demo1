import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ICostType } from './model/costtype.module';
import { CostTypeService } from './costtype.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-costtype-update',
  templateUrl: './costtype-update.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule
  ],
})
export class CosttypeUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  isViewMode = false;
  saving = false;
  costTypeMaster?: ICostType | undefined;

  constructor(
    private fb: FormBuilder,
    private costtypeService: CostTypeService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.editForm = this.fb.group({
      costCodeId: [],
      costCodeTypeDesc: ['', [Validators.required, Validators.maxLength(20)]],
      status: ['ACTIVE'],
    });
  }
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const mode = this.route.snapshot.url[1]?.path;

    this.isEditMode = mode === 'edit' || !id;
    this.isViewMode = mode === 'view';

    if (id) {
      this.isEditMode = true;
      this.costtypeService.getCostTypeById(+id).subscribe(costtype => {
        if (costtype) {
          this.editForm.patchValue({
            ...costtype,
            status: costtype.status == 'ACTIVE' ? true : false
          });
          if (this.isViewMode) {
            this.editForm.disable();
          }
        }
      });
    }
  }
  updateCostType() {
    if (this.editForm.valid) {
      const formValue = this.editForm.value;
      const isUpdate = !!formValue.costCodeId;
      const action = isUpdate ? 'update' : 'create';

      const confirmMsg = `Are you sure you want to ${action} this Cost Code Type?`;
      if (!window.confirm(confirmMsg)) {
        return; // Cancel the operation
      }

      this.saving = true;

      const costCodeTypeToSave = {
        ...formValue,
        status: formValue.status ? 'ACTIVE' : 'INACTIVE',
      };

      if (!isUpdate) {
        delete costCodeTypeToSave.costCodeId;
      }

      const request = isUpdate
        ? this.costtypeService.updateCostType(costCodeTypeToSave, formValue.costCodeId)
        : this.costtypeService.createCostType(costCodeTypeToSave);

      request.subscribe({
        next: () => {

          this.toastr.success(`Cost Code Type ${isUpdate ? 'updated' : 'created'} successfully`);
          this.saving = false;
          this.router.navigate(['/costtype-master']);
        },
        error: () => {
          this.toastr.error(`Error ${isUpdate ? 'updating' : 'creating'} Cost Code Type`);
          this.saving = false;
        },
      });
    }
  }

  previousState(): void {
    window.history.back();
  }
}
