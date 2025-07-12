import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { SelectionService } from '../../core/selection.service';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {StateStorageService} from '../../core/auth/state-storage.service';
import { IBranch } from '../../module/master/common/branch-mst/models/branch.model';
import { BranchmstService } from '../../module/master/common/branch-mst/services/branchmst.service';
import { IDivision } from '../../module/master/common/companydivisionmst/models/division.model';
import { CompanydivisionmstService } from '../../module/master/common/companydivisionmst/services/companydivisionmst.service';
import { ICompany } from '../../module/master/common/companymst/models/company.model';
import { CompanymstService } from '../../module/master/common/companymst/services/companymst.service';
 
@Component({
  standalone: true,
  selector: 'app-company-selection',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule,DragDropModule  ],
  templateUrl: './company-selection.component.html',
})
export class CompanySelectionComponent implements OnInit {



  form: FormGroup;
  branchmstData:IBranch[] =[];
  compnaymstdata: ICompany[] = [];
  divisionmstData: IDivision[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CompanySelectionComponent>,
    private selectionService: SelectionService,
    private stateStorageService: StateStorageService,
    private companyService: CompanymstService,
    private companyDivisionService: CompanydivisionmstService,
    private branchService:BranchmstService,
  ) {
    this.form = this.fb.group({
      company: [this.stateStorageService.getSelCompany(), Validators.required],
      division: [this.stateStorageService.getSelDivision(), Validators.required],
      branch: [this.stateStorageService.getSelBranch(), Validators.required],
    });
  }

  ngOnInit(): void {

    this.companyService.getAssignedCompanyList().subscribe(e => {
      this.compnaymstdata = e;
      console.log(this.compnaymstdata);
    })
    this.companyDivisionService.getAssignedDivisionList().subscribe(e => {
      this.divisionmstData = e;
    })
    this.branchService.getAssignedBranchList().subscribe(e => {
      this.branchmstData = e;
    })

  }
  submit(): void {
    if (this.form.valid) {
      const { company, division, branch } = this.form.value;
      this.selectionService.setSelection(company, division, branch);
      this.stateStorageService.storeCompanySelection(company, division, branch);
      this.dialogRef.close(true);
    } else {
      this.form.markAllAsTouched();
    }
  }
}

function inject(Router: any) {
    throw new Error('Function not implemented.');
}
