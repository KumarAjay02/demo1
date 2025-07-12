import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { journalvoucherService } from './journalvoucher.service';


@Component({
  selector: 'app-journalvoucher-delete-dialog',
  templateUrl: './journalvoucher-delete-dialog.component.html',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class journalvoucherDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<journalvoucherDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { journalvoucher: any },
    private journalvoucherService: journalvoucherService,
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.journalvoucherService.delete(this.data.journalvoucher.ID).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting Journal Voucher:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
