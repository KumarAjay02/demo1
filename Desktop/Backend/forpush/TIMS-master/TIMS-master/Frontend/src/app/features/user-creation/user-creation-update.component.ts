import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserCreationService } from './user-creation.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import {MultiSelect} from 'primeng/multiselect';
 
import { MatIconModule } from '@angular/material/icon';
import {IUser} from './model/user-creation.model';
import { IBranch } from '../../module/master/common/branch-mst/models/branch.model';
import { BranchmstService } from '../../module/master/common/branch-mst/services/branchmst.service';
import { IDivision } from '../../module/master/common/companydivisionmst/models/division.model';
import { CompanydivisionmstService } from '../../module/master/common/companydivisionmst/services/companydivisionmst.service';
import { ICompany } from '../../module/master/common/companymst/models/company.model';
import { CompanymstService } from '../../module/master/common/companymst/services/companymst.service';

@Component({
  selector: 'app-user-creation-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    MatDialogModule,
    MatTooltipModule,
    FormsModule,
    MultiSelect,
    MatIconModule
  ],
  templateUrl: './user-creation-update.component.html'
})
export class UserCreationUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  isViewMode = false;
  saving = false;
  checkingUser = false;
  userExists = false;
  companies: ICompany[] = [];
  divisions: IDivision[] = [];
  branches: IBranch[] = [];
  isHide = false;
  selectedCompanies:ICompany[]=[];
  selectedBranches:IBranch[]=[];
  selectedDivision:IDivision[]=[];
  constructor(
    private fb: FormBuilder,
    private userService: UserCreationService,
    private companyService: CompanymstService,
    private branchService: BranchmstService,
    private divisionService:CompanydivisionmstService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.editForm = this.fb.group({
      id: [],
      login: ['', Validators.required],
      password:['',Validators.required],
      user: ['', Validators.required],
      dept:[''],
      email: ['', [Validators.required, Validators.email]],
      hodmail:[''],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      companies: [[]],
      divisions: [[]],
      branches: [[]],
      defaultPremises:[''],
      userStatus: [true],
      userLock:[false],
      permLock:[false],
      createdDate: [],
      createdBy: []
    });

    this.loadDropdownData();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const mode = this.route.snapshot.url[1]?.path;

    this.isEditMode = mode === 'edit';
    this.isViewMode = mode === 'view';

    if (id) {
      this.userService.getUserById(+id).subscribe(user => {
        if (user) {
          console.log(user);
          this.editForm.patchValue(user);
          if (this.isViewMode) {
            this.editForm.disable();
          }
          if(this.isViewMode || this.isEditMode)
          {
            this.editForm.get('login').disable();
            this.selectedCompanies=user.companies;
            this.selectedDivision=user.divisions;
            this.selectedBranches=user.branches;
          }
        }
      });
    }
  }

  loadDropdownData(): void {
    this.companyService.getCompanyList().subscribe(companies => this.companies = companies);
     this.divisionService.getDivisonList().subscribe(divisions => this.divisions = divisions);
     this.branchService.getBranchList().subscribe(branches => this.branches = branches);
  }

  checkUser(): void {
    const loginCode = this.editForm.get('login')?.value;
    if (loginCode) {
      this.checkingUser = true;
      this.userService.getUserByLoginCode(loginCode).subscribe({
        next: (exists) => {
          if (exists !== null && exists.id != null) {
            this.editForm.patchValue(exists);
            this.toastr.info('User found. Editing existing user.');
            this.userExists = true;
          } else {
            this.toastr.info('User not found. You can create a new user.');
            this.userExists = false;
          }

        },
        error: (err) => {
          this.userExists = false;
          const errorMessage = err?.error?.message || 'Failed to check user. Please try again later.';
          this.toastr.info(errorMessage+'; You can create a new user.');
        }
      });
       this.checkingUser = false;
    }
  }


  save(): void {
    if (this.editForm.invalid) return;

    this.saving = true;
    const user :IUser= this.editForm.getRawValue();
    console.log("us",user);
    const action = this.isEditMode ? 'update' : 'create';
    const confirmMsg = `Are you sure you want to ${action} this user?`;
    if (!window.confirm(confirmMsg)) {
      this.saving = false;
      return;
    }
    if(!this.isEditMode)
    {
      delete  user.id;
    }

    user.companies=this.selectedCompanies;
    user.divisions=this.selectedDivision;
    user.branches=this.selectedBranches;

    const request = this.isEditMode
      ? this.userService.updateUser(user, user.id)
      : this.userService.createUser(user);

    request.subscribe({
      next: () => {
        this.toastr.success(`User ${this.isEditMode ? 'updated' : 'created'} successfully`);
        this.router.navigate(['/users']);
      },
      error: (err:any) => {
        let errorMessage = `Error ${this.isEditMode ? 'updating' : 'creating'} user`;
        if (err?.error?.message) {
          // Custom error message from API (e.g., Conflict)
          errorMessage = err.error.message;
        }
        else if (err.status === 400 && err.error?.errors) {
          const errors = err.error.errors;
          const firstKey = Object.keys(errors)[0]; // e.g., "createdBy"
          errorMessage = errors[firstKey][0];
        }
        else if (err?.error && typeof err.error === 'object') {
          const modelStateErrors = Object.values(err.error)
            .flat()
            .join(' | ');
          errorMessage += `: ${modelStateErrors}`;
        } else if (typeof err?.error === 'string') {
          errorMessage += `: ${err.error}`;
        }
        this.toastr.error(errorMessage);
        this.saving=false;
      },
      complete: () => {
        this.saving = false;
      }
    });
  }


  previousState(): void {
    window.history.back();
  }

  toggleSelection(item: string, arrayName: string): void {
    const control = this.editForm.get(arrayName);
    if (control) {
      const currentArray: string[] = control.value || [];
      const index = currentArray.indexOf(item);

      if (index === -1) {
        currentArray.push(item);
      } else {
        currentArray.splice(index, 1);
      }

      control.setValue(currentArray);
    }
  }

  isSelected(item: string, arrayName: string): boolean {
    const control = this.editForm.get(arrayName);
    return control ? control.value.includes(item) : false;
  }
  isFieldInvalid(fieldName: string): boolean {
    const control = this.editForm.get(fieldName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }
  showHide(): void {
    this.isHide = !this.isHide;
  }
  checkInvalidControls() {
    const invalidControls = [];
    const controls = this.editForm.controls;

    for (const name in controls) {
      if (controls[name].invalid) {
        invalidControls.push(name);
        console.warn(`Control "${name}" is invalid. Errors:`, controls[name].errors);
      }
    }

    if (invalidControls.length === 0) {
      console.log('All controls are valid.');
    }

    return invalidControls;
  }
}
