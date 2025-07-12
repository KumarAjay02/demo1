// challan-delete-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ChallanService } from './challan.service';

@Component({
  selector: 'app-challan-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './challan-delete-dialog.component.html'
})
export class ChallanDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ChallanDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { challan: any },
    private challanService: ChallanService
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.challanService.delete(this.data.challan.id).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting challan:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
