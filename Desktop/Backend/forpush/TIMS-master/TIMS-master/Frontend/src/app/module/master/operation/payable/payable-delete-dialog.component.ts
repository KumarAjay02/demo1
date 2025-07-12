// payable-delete-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PayableService } from './payable.service';

@Component({
  selector: 'app-payable-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './payable-delete-dialog.component.html'
})
export class PayableDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PayableDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { payable: any },
    private payableService: PayableService
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.payableService.delete(this.data.payable.Id).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting payable:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
