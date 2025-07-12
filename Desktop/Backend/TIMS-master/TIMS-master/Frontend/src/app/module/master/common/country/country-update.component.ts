import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from './country.service';
import { ICountry } from './model/country.model';
import { LoadingserviceService } from '../../../../shared/loading/loadingservice.service';
import { CountryDeleteDialogComponent } from './country-delete-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-country-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule],
  templateUrl: './country-update.component.html'
})
export class CountryUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  isViewMode = false;
  isNew = false;
  isMode = true;
LoginUser:string='rahul';
 
  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService,
    private loading: LoadingserviceService,


  ) {
    this.editForm = this.fb.group({
      countryCode: ['', Validators.required],
      countryName: ['', Validators.required],
      currency: ['', Validators.required],
      isActive: ['', Validators.required],
      CreatedBy: [],
      ModifiedBy: [],
    
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.isEditMode = this.router.url.includes('edit');
    this.isViewMode = this.router.url.includes('view');
    this.isNew = this.router.url.includes('new');

    if (id) this.loadCountry(id);

    if (this.isNew) {
      this.isMode = false;
    }
  }

  loadCountry(id: string): void {

    this.loading.show();
    this.countryService.getCountryById(id).subscribe({
      next: res => {
        if (res.status) {
          this.editForm.patchValue(res.data);
          this.editForm.get('countryCode')?.disable();

          if (this.isViewMode) {
            this.editForm.disable();
            this.isMode = true;
          } else {
            this.editForm.enable();
            this.isMode = false;
           
            this.editForm.get('countryCode')?.disable(); // still keep countryCode disabled in edit
           
          }
        } else {
          this.toast.warning(res.message);
          this.router.navigate(['/country-master']);
        }
        this.loading.hide();
      },
      error: err => {
        this.toast.error(err?.error?.message || 'Failed to load country');
        this.router.navigate(['/country-master']);
        this.loading.hide();
      }
    });
  }

  updateCountry(): void {
 
    if (this.editForm.invalid) {
      this.toast.warning('Please complete all required fields');
      return;
    }

    if (this.isNew) {
      this.editForm.get('CreatedBy').setValue(this.LoginUser);
    
      this.Create();
       
    } else {
      this.editForm.get('ModifiedBy').setValue(this.LoginUser);
 
      this.Update();
       
    }
  }

  Update() {
    const updateid = this.route.snapshot.paramMap.get('id');
    if (!updateid) {

      this.toast.warning('id is requred or not valid !');
      return;
    }
    const updateData = this.editForm.getRawValue();
    this.loading.show();
    debugger;
    this.countryService.update(updateid, updateData).subscribe({
      next: res => {
        if (res.body.status) {
          
          this.toast.success('Message ' + res.body.message, 'Success');
          this.router.navigateByUrl('/country-master');
        } else {
          this.toast.error('Error update Country' + res.body.message);
        }
        this.loading.hide();
      },
      error: err => {
        this.toast.error('API Error: ' + (err.error?.message));
        this.loading.hide();
      }
    }
    );

  }
  Create() {
    const newRoute = this.router.url.includes('new');
    if (newRoute) {
      this.loading.show()
      var formdata = this.editForm.getRawValue();
      this.countryService.create(formdata).subscribe({
        next: res => {
          if (res.status) {
            this.toast.success('Country saved successfully');
            this.router.navigate(['/country-master']);
          } else {
            this.toast.error('Save failed: ' + res.message);

          }
          this.loading.hide();
        }, error: err => {
          this.toast.error('API Error: ' + (err.error?.message));
          this.loading.hide();
        }
      })
    }
  }
  previousState(): void {
    this.router.navigate(['/country-master']);
  }
}
