import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TcsPaymentService } from './tcs-payment.service';

@Component({
  selector: 'app-tcs-payment-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './tcs-payment-delete-dialog.component.html'
})
export class TcsPaymentDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TcsPaymentDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { payment: any },
    private paymentService: TcsPaymentService
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.paymentService.deletePayment(this.data.payment.id!).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting payment:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
