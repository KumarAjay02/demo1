import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IBS_DISP_INFO } from './model/bl-pl-disp-info.module';
import { BLPLDispInfoService } from './bl-pl-disp-info.service';

@Component({
  selector: 'app-bl-pl-disp-info-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule],
  templateUrl: './bl-pl-disp-info-update.component.html'
})
export class BlPlDispInfoUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  updateBlPlDispInfo?: IBS_DISP_INFO | undefined;

  constructor(
    private fb: FormBuilder,
    private bsplDispInfoService: BLPLDispInfoService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.editForm = this.fb.group({
      BS_DISP_INFO: [],
      ID: ['', [Validators.required]],
      GL_NATURE: ['', [Validators.required]],
      BS_HEAD_CODE: ['', [Validators.required]],
      BS_HEAD_NAME: ['', [Validators.required], Validators.maxLength(100)],
      SCHEDULE_CODE: ['', [Validators.required]],
      GL_GROUP_CODE: ['', [Validators.required]],
      SRNO: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.bsplDispInfoService.getBLPLDispInfo().subscribe(data => {
        if (data) {
          this.editForm.patchValue(data);
        }
      });
    }
  }
  updateBsPlDispInfo() {
    if (this.editForm.valid) {
      const Id = this.editForm.value;
      this.bsplDispInfoService.updateBLPLDispInfo(Id).subscribe(() => {
        this.router.navigate(['/bl-pl-disp-info']);
      });
    }
  }

  previousState(): void {
    window.history.back();
  }
}

