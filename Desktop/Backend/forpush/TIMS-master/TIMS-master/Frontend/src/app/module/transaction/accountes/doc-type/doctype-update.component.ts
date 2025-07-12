import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IDocType } from './model/doctype.module';
import { DoctypeService } from './doctype.service';

@Component({
  selector: 'app-doctype-update',
  templateUrl: './doctype-update.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule
  ],
})
export class DoctypeUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  docTypeMaster?: IDocType | undefined;

  constructor(
    private fb: FormBuilder,
    private doctypeService: DoctypeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      Serial_No: [],
      DOC_TYPE: ['', [Validators.required, Validators.maxLength(6)]],
      DOC_DETAILS: ['', [Validators.required, Validators.maxLength(100)]],
      DOC_CATG: ['', [Validators.required, Validators.maxLength(20)]],
      IsActive: [true]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.doctypeService.getDocTypeById(+id).subscribe(data => {
        if (data) {
          this.editForm.patchValue(data);
        }
      });
    }
  }
  updateDocType() {
    if (this.editForm.valid) {
      const doctype = this.editForm.value;
      console.log(doctype);
      this.doctypeService.updateDocType(doctype).subscribe(() => {
        this.router.navigate(['/doctype-master']);
      });
    }
  }

  previousState(): void {
    window.history.back();
  }
}
