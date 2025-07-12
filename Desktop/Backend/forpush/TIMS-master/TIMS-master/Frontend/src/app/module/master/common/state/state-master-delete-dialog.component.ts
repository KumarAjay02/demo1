// state-delete-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { StateService } from './state.service';

@Component({
  selector: 'app-state-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './state-master-delete-dialog.component.html'
})
export class StateDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<StateDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { state: any },
    private stateService: StateService
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.stateService.delete(this.data.state.id).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error deleting state:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
