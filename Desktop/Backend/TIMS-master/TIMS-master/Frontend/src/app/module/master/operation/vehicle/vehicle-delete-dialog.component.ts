// vehicle-delete-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { VehicleService } from './vehicle.service';

@Component({
  selector: 'app-vehicle-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './vehicle-delete-dialog.component.html'
})
export class VehicleDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<VehicleDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vehicle: any },
    private vehicleService: VehicleService
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.vehicleService.delete(this.data.vehicle.id).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting vehicle:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
