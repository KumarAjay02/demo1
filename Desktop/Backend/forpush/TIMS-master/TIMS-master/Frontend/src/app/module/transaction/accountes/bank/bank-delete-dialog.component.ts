import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BankService } from './bank.service';

@Component({
  selector: 'app-bank-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './bank-delete-dialog.component.html'
})
export class BankDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BankDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bank: any },
    private bankService: BankService
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  confirmDelete(): void {
    this.bankService.delete(this.data.bank.id).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting bank:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
