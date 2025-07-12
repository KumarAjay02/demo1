import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LiabilityEntryService } from './liability-entry.service';

@Component({
  selector: 'app-liability-entry-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './liability-entry-delete-dialog.component.html'
})
export class LiabilityEntryDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LiabilityEntryDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { entry: any },
    private entryService: LiabilityEntryService
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.entryService.deleteEntry(this.data.entry.id!).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting entry:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
