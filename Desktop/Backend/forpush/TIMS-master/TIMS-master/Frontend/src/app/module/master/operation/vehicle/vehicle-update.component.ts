// vehicle-update.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VehicleService } from './vehicle.service';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SelectionService } from '../../../../core/selection.service';
 

@Component({
  selector: 'app-vehicle-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatTabsModule,
    MatSelectModule,
    MatRadioModule,
    MatFormFieldModule, MatTooltipModule],
  templateUrl: './vehicle-update.component.html',
  styleUrls: ['./vehicle-update.component.scss']
})
export class VehicleUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router,
    private selectionService: SelectionService
  ) {
    this.editForm = this.fb.group({
      id: [],
      coCode: [{ value: this.selectionService.company, disabled: true }],
      divCode: [{value:this.selectionService.division,disabled:true}],
      vehicleNo: ['', Validators.required],
      chasisNo: [''],
      engineNo: [''],
      ownerName: [''],
      mobileNo: [''],
      vehicleModel: [''],
      vehicleYear: [''],
      actualCapacity: [''],
      caringCapacity: [''],
      payableForm:[''],
      payableId:[''],
      status:['Active'],
      insStartDate:[this.getCurrentDate()],
      insExpiry:[this.getCurrentDate()],
      vehicleSize:[],
      ownerPanNo:[],
      active:['Yes'],
      capacity:[],
      branchCode:[{value:this.selectionService.branch,disabled:true}],
    });

  }

  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // 'yyyy-MM-dd'
  }
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.vehicleService.getVehicleById(+id).subscribe(vehicle => {
        if (vehicle) {
          this.editForm.patchValue(vehicle);
        }
      });
    }
  }

  updateVehicle() {
    if (this.editForm.valid) {
      const vehicle = this.editForm.value;
      this.vehicleService.updateVehicle(vehicle).subscribe(() => {
        this.router.navigate(['/vehicle-master']);
      });
    }
  }

  previousState(): void {
    window.history.back();
  }
  onFileSelected(event: any, type: 'PUC' | 'RC' | 'INS'): void {
    const file = event.target.files[0];
    if (file) {
      console.log(`Selected file for ${type}:`, file);
      // You can store them in variables or a form group if needed
      // Example:
      // this.uploadFiles[type] = file;
    }

  }

}
