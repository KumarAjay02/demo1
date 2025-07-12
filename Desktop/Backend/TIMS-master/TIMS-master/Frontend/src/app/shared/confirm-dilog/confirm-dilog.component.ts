import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dilog',
  imports: [MatDialogModule,MatButtonModule,CommonModule],
  templateUrl: './confirm-dilog.component.html',
  styleUrl: './confirm-dilog.component.scss'
})
export class ConfirmDilogComponent {

  constructor(
    public dialogRef:MatDialogRef<ConfirmDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any

  ){}


  Cancle(){
 this.dialogRef.close(true);
  }
  Confirm(){
 this.dialogRef.close(false);
  }
}
