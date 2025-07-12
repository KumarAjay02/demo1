import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DoctypeService } from './doctype.service';

@Component({
  selector: 'app-doctype-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './doctype-delete-dialog.component.html'
})
export class DoctypeDeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DoctypeDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { doctype: any },
    private DoctypeService: DoctypeService
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  confirmDelete(): void {
    this.DoctypeService.delete(this.data.doctype.Serial_No).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting Document Type:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
