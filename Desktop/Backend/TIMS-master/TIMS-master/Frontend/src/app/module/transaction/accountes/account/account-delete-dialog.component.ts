import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { accountService } from './account.service';

@Component({
  selector: 'app-account-delete-dialog',
  templateUrl: './account-delete-dialog.component.html',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class AccountDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AccountDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { account: any },
    private accountService: accountService
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.accountService.delete(this.data.account.SERIAL_NO).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting Account:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
