import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DebitNoteServiceService } from './service/debit-note-service.service';
import { debitnote } from './model/debitNote';
@Component({
  selector: 'app-debit-note',
  imports: [ CommonModule,
    RouterModule,
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
    FontAwesomeModule,
    MatTooltipModule],
  templateUrl: './debit-note.component.html',
  styleUrl: './debit-note.component.scss'
})
export class DebitNoteComponent  implements OnInit{




  //testing 

  
     service = inject(DebitNoteServiceService);
    _router = inject(Router);
    branchList: debitnote[] = [];
    ngOnInit(): void {
      this.service.getBranchList().subscribe((data: debitnote[]) => {
        this.branchList = data;
      })
    }
    BtnView(id: any) {
  
      this._router.navigateByUrl('/debitnote/new/' + id);
    }
  
    BtnUpdate(id: any) {
      this._router.navigateByUrl('debitnote/new/'+id);
    }


  //testing
  
  handleUnauthorized() {
   // this.toastr.error('You are not authorized to access this page');
    setTimeout(() => {
     // this.router.navigate(['/dashboard']);
    }, 2000);
  }

  
}
