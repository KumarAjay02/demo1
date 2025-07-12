import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookingbasicmstService } from '../../services/bookingbasicmst.service';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BookingBasisMaster } from '../../models/bookingbasicmst.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-bookingbasismst-form',
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './bookingbasismst-form.component.html',
  styleUrl: './bookingbasismst-form.component.css'
})
export class BookingbasismstFormComponent implements OnInit{



  private fb = inject(FormBuilder);
  private _service = inject(BookingbasicmstService);
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
    isActive: ['Y']
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
        next: (data: BookingBasisMaster[]) => {
          if (data && data.length > 0) {
            const packing = data[0];
           this.editForm.patchValue(packing, { emitEvent: false });
            console.log(data[0],'data');
  
            if (this.isViewMode) {
              alert(mode);
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
    console.log("testing")
    if (this.editForm.valid) {
      const formValue = this.editForm.getRawValue();
      const mode = this.route.snapshot.url[0]?.path;
      const confirmMsg = `Are you sure you want to ${mode} this BookingBasisMode  master?`;

      if (!window.confirm(confirmMsg)) return;

      const packingToSave: BookingBasisMaster = {
        code: formValue.code?.toUpperCase(),
        description: formValue.description?.toUpperCase(),
        isActive: formValue.isActive ? 'Y' : 'N',
      };

      let request: Observable<HttpResponse<BookingBasisMaster>>;

      if (mode === 'edit') {
        request = this._service.update(formValue.code, packingToSave);
      } else {
        request = this._service.create(packingToSave);
      }      
      request.subscribe({
        next: () => {
          this.toastr.success(`BookingBasis ${mode === 'edit' ? 'updated' : 'created'} successfully`);
          this.saving = false;
          this.router.navigate(['/bookingbasicmst']);
        },
        error: () => {
          this.toastr.error(`Error ${mode === 'edit' ? 'updating' : 'creating'} BookingBasis Mode`);
          this.saving = false;
        }
      });
    }
  }

}
