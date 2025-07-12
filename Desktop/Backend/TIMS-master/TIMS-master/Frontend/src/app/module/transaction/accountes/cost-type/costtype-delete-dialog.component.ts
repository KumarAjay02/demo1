import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CostTypeService } from './costtype.service';

@Component({
  selector: 'app-costtype-delete-dialog',
  templateUrl: './costtype-delete-dialog.component.html',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class CosttypeDeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CosttypeDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { costtype: any },
    private costtypeService: CostTypeService
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.costtypeService.delete(this.data.costtype.costCodeId).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting Cost Code Type:', err);
        this.dialogRef.close(false);
      }
    });
  }


}
