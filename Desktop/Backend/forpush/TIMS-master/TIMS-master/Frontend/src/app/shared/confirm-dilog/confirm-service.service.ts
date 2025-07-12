import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDilogComponent } from './confirm-dilog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmServiceService {

  constructor(private dialog:MatDialog) { }


  confirm(message:string,title:string="Confirmation"){
    const dialogRef=this.dialog.open(ConfirmDilogComponent,{
      data:{message,title}
    });
    return dialogRef.afterClosed();
  }

}
