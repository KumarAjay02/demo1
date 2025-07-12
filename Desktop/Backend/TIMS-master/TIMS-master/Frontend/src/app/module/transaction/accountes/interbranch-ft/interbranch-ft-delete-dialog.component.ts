import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InterBranchFundTransferService } from './interbranch-ft.service';



@Component({
  selector: 'app-interbranch-ft-delete-dialog',
  templateUrl: './interbranch-ft-delete-dialog.component.html',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class InterBranchFundTransferDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<InterBranchFundTransferDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contra: any },
    private interBranchFundTransferService: InterBranchFundTransferService,
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.interBranchFundTransferService.delete(this.data.contra.ID).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting Inter Branch Fund Transfer:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
