// road-tcs-update.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoadTcsService } from './road-tcs.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
 
import {IChallanEntry} from './model/challan.model';
import { SelectionService } from '../../../../core/selection.service';

@Component({
  selector: 'app-road-tcs-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, MatDialogModule, MatTooltipModule, FormsModule],
  templateUrl: './road-tcs-update.component.html',
  styleUrls: ['./road-tcs-update.component.scss']
})
export class RoadTcsUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  challans:IChallanEntry[]=[{
    challanType: 'LONGROUTE',
    challanNumber: 'CH123456',
    id: 1,
    date: '2025-05-15',
    fromBranch: 'Delhi',
    toBranch: 'Mumbai',
    mode: 'Road',
    route: 'Delhi → Jaipur → Mumbai',
    vehicleNumber: 'DL01AB1234',
    weight: 1200.5,
    ackInd:'N',
    ackBy:'',
    clnErp:'A'
  }];
  constructor(
    private fb: FormBuilder,
    private roadTcsService: RoadTcsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private selectionService: SelectionService
  ) {
    this.editForm = this.fb.group({
      id: [],
      date: [this.getCurrentDate(), Validators.required],
      vehicleNumber: ['', Validators.required],
      panNo: [''],
      driverName: ['', Validators.required],
      vehicleSize: ['20FT'],
      sealNumber: [''],
      challanType: ['Regular'],
      remarks: [''],
      toBranch: ['Mumbai'],
      payableName: [''],
      vendorBrokerName: [''],
      driverNo: [''],
      route: ['Mumbai-Delhi'],
      weightGuarantee: [0],
      noOfTouchingPoint: [0],
      lorryHire: [0],
      extraAmount: [0],
      advance: [0],
      balance: [0],
      tdsApplicable: [false],
      kantaVajan: [0],
      entryBy: [''],
      entryDate: [''],
      updatedBy: [''],
      updatedDate: [''],
      tcsType:['L'],
      touchingPoint1:[{value:'',disabled:true}],
      touchingPoint2:[{value:'',disabled:true}],
      touchingPoint3:[{value:'',disabled:true}],
      touchingPoint4:[{value:'',disabled:true}],
      touchingPoint5:[{value:'',disabled:true}],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.roadTcsService.getRoadTcsById(+id).subscribe(roadTcs => {
        if (roadTcs) {
          this.editForm.patchValue(roadTcs);
          this.calculateBalance();
        }
      });
    } else {
      this.isEditMode = false;
      this.calculateBalance();
    }

    // Calculate balance when financial fields change
    this.editForm.get('lorryHire')?.valueChanges.subscribe(() => this.calculateBalance());
    this.editForm.get('extraAmount')?.valueChanges.subscribe(() => this.calculateBalance());
    this.editForm.get('advance')?.valueChanges.subscribe(() => this.calculateBalance());
  }

  calculateBalance(): void {
    const lorryHire = this.editForm.get('lorryHire')?.value || 0;
    const extraAmount = this.editForm.get('extraAmount')?.value || 0;
    const advance = this.editForm.get('advance')?.value || 0;
    const balance = (lorryHire + extraAmount) - advance;
    this.editForm.get('balance')?.setValue(balance);
  }

  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  updateRoadTcs() {
    if (this.editForm.valid) {
      const roadTcs = this.editForm.value;

      if (this.isEditMode) {
        this.roadTcsService.update(roadTcs).subscribe(() => {
          this.router.navigate(['/road-tcs-master']);
        });
      } else {
        this.roadTcsService.create(roadTcs).subscribe(() => {
          this.router.navigate(['/road-tcs-master']);
        });
      }
    }
  }

  previousState(): void {
    window.history.back();
  }
  touchingPointChange():void{
    const noOfPoints=this.editForm.get("noOfTouchingPoint")?.value;
    if(noOfPoints>=1){this.editForm.get("touchingPoint1")?.enable();}
    else {this.editForm.get("touchingPoint1")?.disable();}
    if(noOfPoints>=2){this.editForm.get("touchingPoint2")?.enable();}
    else {this.editForm.get("touchingPoint2")?.disable();}
    if(noOfPoints>=3){this.editForm.get("touchingPoint3")?.enable();}
    else {this.editForm.get("touchingPoint3")?.disable();}
    if(noOfPoints>=4){this.editForm.get("touchingPoint4")?.enable();}
    else {this.editForm.get("touchingPoint4")?.disable();}
    if(noOfPoints==5){this.editForm.get("touchingPoint5")?.enable();}
    else {this.editForm.get("touchingPoint5")?.disable();}
  }
}
