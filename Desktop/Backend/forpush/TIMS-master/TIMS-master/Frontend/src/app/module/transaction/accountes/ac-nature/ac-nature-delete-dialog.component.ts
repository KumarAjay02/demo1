// country-delete-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AcNatureService } from './ac-nature.service';


@Component({
  selector: 'app-ac-nature-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './ac-nature-delete-dialog.component.html'
})
export class AcNatureDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AcNatureDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { acNature: any },
    private AcNatureService: AcNatureService
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.AcNatureService.delete(this.data.acNature.serialNo).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting account Nature:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
