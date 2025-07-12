// city-delete-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CityService } from './city.service';

@Component({
  selector: 'app-city-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './city-delete-dialog.component.html'
})
export class CityDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CityDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { city: any },
    private cityService: CityService
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.cityService.delete(this.data.city.id).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting city:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
