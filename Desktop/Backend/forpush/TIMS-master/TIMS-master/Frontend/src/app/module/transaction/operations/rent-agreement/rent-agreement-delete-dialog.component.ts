import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RentAgreementService } from './rent-agreement.service';

@Component({
  selector: 'app-rent-agreement-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './rent-agreement-delete-dialog.component.html'
})
export class RentAgreementDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RentAgreementDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { agreement: any },
    private agreementService: RentAgreementService
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.agreementService.deleteAgreement(this.data.agreement.id!).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting agreement:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
