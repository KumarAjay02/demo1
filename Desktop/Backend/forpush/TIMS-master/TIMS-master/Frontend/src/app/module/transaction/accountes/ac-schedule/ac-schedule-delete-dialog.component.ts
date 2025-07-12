import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ACScheduleService } from './ac-schedule.service';

@Component({
  selector: 'app-ac-schedule-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './ac-schedule-delete-dialog.component.html'
})
export class AcScheduleDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AcScheduleDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { schedule: any },
    private acScheduleService: ACScheduleService,
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  confirmDelete(): void {
    this.acScheduleService.delete(this.data.schedule.serialNo).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error deleting Account Schedule:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
