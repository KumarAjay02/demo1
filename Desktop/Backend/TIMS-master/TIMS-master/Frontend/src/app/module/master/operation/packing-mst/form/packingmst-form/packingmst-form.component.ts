import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PackingMaster } from '../../models/packingmst.model';
import { PackingmstService } from '../../services/packingmst.service';
import { CommonModule } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-packingmst-form',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './packingmst-form.component.html',
  styleUrls: ['./packingmst-form.component.css']
})
export class PackingmstFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private _service = inject(PackingmstService);
  private route = inject(ActivatedRoute);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  ismode = true;
  isViewMode: boolean = false;
  isEditMode: boolean = false;
  code: string | null = null;
  saving: boolean = false;

  editForm: FormGroup = this.fb.group({
    code: [''],
    description: [''],
    isActive: [false, Validators.required]
  });

  ngOnInit(): void {
    this.getBySingle();
    
  }

  getBySingle() {
    const code = this.route.snapshot.paramMap.get('code');
    const mode = this.route.snapshot.url[0]?.path;

    this.isEditMode = mode === 'edit' || !code;
    this.isViewMode = mode === 'view';
   
    if (!code) return;

    this._service.searchByDescriptionPostWithQuery(code).subscribe({
      next: (data: PackingMaster[]) => {
        if (data && data.length > 0) {
          const packing = data[0];
          this.editForm.patchValue({
            code: packing.code,
            description: packing.description,
            isActive: packing.isActive === 'Y'
          });

          if (this.isViewMode) {
            this.editForm.disable();
            this.ismode = false;          
          }
          else{
          this.editForm.get('code')?.disable();
          }
        } else {
          console.warn(`No packing data found for code ${code}`);           
          this.editForm.reset();
        }
      },
      error: (err) => {
        console.error('Error loading packing data:', err);
        this.editForm.reset();
      }
    });
  }

  BtnSave(): void {
    if (this.editForm.valid) {
      const formValue = this.editForm.getRawValue();
      const mode = this.route.snapshot.url[0]?.path;
      const confirmMsg = `Are you sure you want to ${mode} this packing master?`;

      if (!window.confirm(confirmMsg)) return;

      const packingToSave: PackingMaster = {
        code: formValue.code?.toUpperCase(),
        description: formValue.description?.toUpperCase(),
        isActive: formValue.isActive ? 'Y' : 'N',
      };

      let request: Observable<HttpResponse<PackingMaster>>;

      if (mode === 'edit') {
        request = this._service.update(formValue.code, packingToSave);
      } else {
        request = this._service.create(packingToSave);
      }      
      request.subscribe({
        next: () => {
          this.toastr.success(`Packing ${mode === 'edit' ? 'updated' : 'created'} successfully`);
          this.saving = false;
          this.router.navigate(['/packingmst']);
        },
        error: () => {
          this.toastr.error(`Error ${mode === 'edit' ? 'updating' : 'creating'} Packing`);
          this.saving = false;
        }
      });
    }
  }
}
