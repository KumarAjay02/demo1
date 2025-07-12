import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customer-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './customer-delete-dialog.component.html'
})
export class CustomerDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CustomerDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { customer: any },
    private customerService: CustomerService
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.customerService.delete(this.data.customer.coCode, this.data.customer.divCode, this.data.customer.customerCode).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting customer:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
