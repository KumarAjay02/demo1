// country-delete-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CountryService } from './country.service';

@Component({
  selector: 'app-country-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './country-delete-dialog.component.html'
})
export class CountryDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CountryDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: any },
    private countryService: CountryService
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

 confirmDelete(): void {
  debugger;
  this.countryService.delete(this.data.id).subscribe({
    next: (res) => {
      this.dialogRef.close(res); // Successful response with status & message
    },
    error: err => {
      console.error('Error deleting country:', err);
      // Send a consistent object with message and status
      this.dialogRef.close({
        status: false,
        message: err?.error?.message || 'An error occurred during deletion',
      });
    }
  });
}
}
