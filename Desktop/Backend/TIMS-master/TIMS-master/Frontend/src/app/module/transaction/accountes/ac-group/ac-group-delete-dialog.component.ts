import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AcGroupServiceService } from './ac-group.service';

@Component({
  selector: 'app-ac-group-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './ac-group-delete-dialog.component.html'
})
export class AcGroupDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AcGroupDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { AcGroup: any },
    private AcGroupService: AcGroupServiceService
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.AcGroupService.delete(this.data.AcGroup.id).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting Account Group:', err);
        this.dialogRef.close(false);
      }
    });
  }
}

