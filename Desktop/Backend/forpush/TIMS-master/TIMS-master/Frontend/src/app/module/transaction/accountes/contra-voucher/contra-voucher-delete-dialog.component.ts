import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { contraVoucherService } from './contra-voucher.service';


@Component({
  selector: 'app-contra-voucher-delete-dialog',
  templateUrl: './contra-voucher-delete-dialog.component.html',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class contravoucherDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<contravoucherDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contra: any },
    private contraVoucherService: contraVoucherService
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.contraVoucherService.delete(this.data.contra.ID).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting Contra Voucher:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
