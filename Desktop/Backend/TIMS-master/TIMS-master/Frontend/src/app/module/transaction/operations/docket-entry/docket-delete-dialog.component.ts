import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions} from '@angular/material/dialog';
import { DocketEntryService } from './docket-entry.service';

@Component({
  selector: 'app-docket-delete-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './docket-delete-dialog.component.html'
})
export class DocketDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DocketDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { entry: any },
    private service: DocketEntryService
  ) {}

  confirmDelete(): void {
    this.service.delete(this.data.entry.id).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
