// bill-submission-delete-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BillSubmissionService } from './bill-submission.service';

@Component({
  selector: 'app-bill-submission-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './bill-submission-delete-dialog.component.html'
})
export class BillSubmissionDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BillSubmissionDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { submission: any },
    private submissionService: BillSubmissionService
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.submissionService.deleteSubmission(this.data.submission.id!).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting submission:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
