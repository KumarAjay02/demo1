import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RentLiabilityApprovalService } from './rent-liability-approval.service';

@Component({
  selector: 'app-rent-liability-approval-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './rent-liability-approval-delete-dialog.component.html'
})
export class RentLiabilityApprovalDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RentLiabilityApprovalDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { approval: any },
    private approvalService: RentLiabilityApprovalService
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.approvalService.deleteApproval(this.data.approval.id!).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting approval:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
