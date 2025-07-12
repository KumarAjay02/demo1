import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IAccount_Groups } from './model/ac-group.module';
import { AcGroupServiceService } from './ac-group.service';

@Component({
  selector: 'app-ac-group-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule
  ],
  templateUrl: './ac-group-update.component.html'
})
export class AcGroupUpdateComponent implements OnInit {
  editForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private acGroupService: AcGroupServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      SerialNo: [],
      AC_Nature: ['', Validators.required],
      ScheduleCode: ['', Validators.required],
      GroupCode: [],
      GroupDesc: ['', [Validators.required, Validators.maxLength(100)]],
      Bs_GroupDesc: [''],
      IsActive: [true]
    });
  }
    ngOnInit(): void {
      const id = this.route.snapshot.params['id'];
      if (id) {
        this.isEditMode = true;
        this.acGroupService.getAcGroupById(+id).subscribe(data => {
          if (data) {
            this.editForm.patchValue(data);
          }
        });
      }
  }

  updateAcGroup() {
    if (this.editForm.valid) {
      const AcGroup = this.editForm.value;
      this.acGroupService.updateAcGroups(AcGroup).subscribe(() => {
        this.router.navigate(['/ac-group']);
      });
    }
  }
  previousState(): void {
    window.history.back();
  }
}
