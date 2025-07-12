import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MrTransferAdjustmentService } from './mr-transfer-adjustment.service';

@Component({
  selector: 'app-mr-transfer-adjustment-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './mr-transfer-adjustment-delete-dialog.component.html'
})
export class MrTransferAdjustmentDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MrTransferAdjustmentDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { adjustment: any },
    private adjustmentService: MrTransferAdjustmentService
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.adjustmentService.deleteAdjustment(this.data.adjustment.id!).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting adjustment:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
