import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { forkJoin } from 'rxjs';
 
import { IBank } from './model/bank.module';
import { ToastrService } from 'ngx-toastr';
import { BankService } from './bank.service';
 
import { MatDialog } from '@angular/material/dialog';
 
import { BankDeleteDialogComponent } from './bank-delete-dialog.component';
import { IvMaster } from '../../../../features/menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../../../../features/menu-access-master/menu-access-master.service';
import { IUserRights } from '../../../../features/menu-access-master/user-rights.model';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
    FontAwesomeModule,
    MatTooltipModule
  ]
})
export class BankListComponent implements OnInit {

  banks: IBank[] = [];
  userRights?: IUserRights;
  private toastr = inject(ToastrService);


  constructor(
    private bankService: BankService,
    private router: Router,
    protected menuAccessMasterService: MenuAccessMasterService,
    private dialog: MatDialog
  ) {}

    ngOnInit(): void {
      const accessCheck = new IvMaster();
      accessCheck.code = this.router.url;

      this.menuAccessMasterService.validate(accessCheck).subscribe({
        next: (message) => {
          if (message.body != null) {
            this.handleUnauthorized();
          } else {
            forkJoin({
              rights: this.menuAccessMasterService.getAuthentications(accessCheck),
              bank: this.bankService.getBank()
            }).subscribe({
              next: ({ rights, bank }) => {
                if (rights.body) {
                  this.userRights = rights.body;
                  console.log(this.userRights);
                }
                if (bank) {
                  this.banks = bank;
                }
              },
              error: () => this.handleUnauthorized()
            });
          }
        },
        error: () => this.handleUnauthorized()
      });
  }

  loadAll() {
    this.bankService.getBank().subscribe(b => { if (b) { this.banks = b } });
  }
  handleUnauthorized() {
    this.toastr.error('You are not authorized to access this page');
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 2000);
  }
  trackId(index: number, item: IBank): number {
    return item.Id ?? 0;
  }

  delete(bank: IBank): void {
    const dialogRef = this.dialog.open(BankDeleteDialogComponent, {
      data: { bank }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAll();
      }
    });
  }
}

