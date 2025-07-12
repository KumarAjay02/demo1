import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { forkJoin } from 'rxjs';
 
import { ToastrService } from 'ngx-toastr';
 
import { MatDialog } from '@angular/material/dialog';
 
import { accountSearch, IAccountSearch } from './model/account-search.module';
import { IAccount } from './model/account.module';
import { accountService } from './account.service';
import { AccountDeleteDialogComponent } from './account-delete-dialog.component';
import { IvMaster } from '../../../../features/menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../../../../features/menu-access-master/menu-access-master.service';
import { IUserRights } from '../../../../features/menu-access-master/user-rights.model';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
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
export class AccountListComponent implements OnInit {
  accounts: IAccount[] = [];
  userRights?: IUserRights;
  accountSearch!: IAccountSearch;
  private toastr = inject(ToastrService);


  constructor(
    private accountService: accountService,
    private router: Router,
    protected menuAccessMasterService: MenuAccessMasterService,
    private dialog: MatDialog
  ) {
    this.accountSearch = new accountSearch();
  }

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
            account: this.accountService.getAccount()
          }).subscribe({
            next: ({ rights, account }) => {
              if (rights.body) {
                this.userRights = rights.body;
                console.log(this.userRights);
              }
              if (account) {
                this.accounts = account;
              }
            },
            error: () => this.handleUnauthorized()
          });
        }
      },
      error: () => this.handleUnauthorized()
    });
  }

  handleUnauthorized() {
    this.toastr.error('You are not authorized to access this page');
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 2000);
  }

  loadAll() {
    this.accountService.getAccount().subscribe(b => { if (b) { this.accounts = b } });
  }

  searchAccount() {
    this.accountService.search(this.accountSearch).subscribe(d => { if (d) { this.accounts = d } });
  }

  trackId(index: number, item: IAccount): number {
    return item.SERIAL_NO ?? 0;
  }

  delete(account: IAccount): void {
    const dialogRef = this.dialog.open(AccountDeleteDialogComponent, {
      data: { account }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAll();
      }
    });
  }
}
