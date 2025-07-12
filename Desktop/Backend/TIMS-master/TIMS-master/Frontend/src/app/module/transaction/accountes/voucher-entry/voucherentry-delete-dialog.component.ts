import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { voucherentryService } from './voucherentry.service';



@Component({
  selector: 'app-voucherentry-delete-dialog',
  templateUrl: './voucherentry-delete-dialog.component.html',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class voucherentryDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<voucherentryDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { voucherentry: any },
    private voucherentryService: voucherentryService,
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.voucherentryService.delete(this.data.voucherentry.ID).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting Voucher Entry:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
