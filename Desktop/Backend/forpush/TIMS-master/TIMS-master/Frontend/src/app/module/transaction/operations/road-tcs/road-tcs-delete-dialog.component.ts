// road-tcs-delete-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RoadTcsService } from './road-tcs.service';

@Component({
  selector: 'app-road-tcs-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './road-tcs-delete-dialog.component.html'
})
export class RoadTcsDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RoadTcsDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { roadTcs: any },
    private roadTcsService: RoadTcsService
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.roadTcsService.delete(this.data.roadTcs.id).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting road tcs:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
