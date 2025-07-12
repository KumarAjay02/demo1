// bill-delete-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BillService } from './bill.service';
import {IBill} from './model/bill.model';

@Component({
  selector: 'app-bill-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './bill-delete-dialog.component.html'
})
export class BillDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BillDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bill: IBill },
    private billService: BillService
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.billService.deleteBill(this.data.bill.id!).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting bill:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
