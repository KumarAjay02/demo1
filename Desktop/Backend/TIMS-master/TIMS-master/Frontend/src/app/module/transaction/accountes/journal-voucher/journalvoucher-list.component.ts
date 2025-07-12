import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { forkJoin } from 'rxjs';
 
import { MatDialog } from '@angular/material/dialog';
 
import { IJournalVoucher, IJournalVoucherSearch, JournalVoucherSearch } from './model/journalvoucher.module';
import { journalvoucherService } from './journalvoucher.service';
import { journalvoucherDeleteDialogComponent } from './journalvoucher-delete-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { IvMaster } from '../../../../features/menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../../../../features/menu-access-master/menu-access-master.service';
import { IUserRights } from '../../../../features/menu-access-master/user-rights.model';



@Component({
  selector: 'app-journalvoucher-list',
  templateUrl: './journalvoucher-list.component.html',
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
export class journalvoucherListComponent implements OnInit {
  journalvouchers: IJournalVoucher[] = [];
  userRights?: IUserRights;
  journalvoucherSearch: IJournalVoucherSearch;
  private toastr = inject(ToastrService);


  constructor(
    private journalvoucherService: journalvoucherService,
    private router: Router,
    protected menuAccessMasterService: MenuAccessMasterService,
    private dialog: MatDialog
  ) {
    this.journalvoucherSearch = new JournalVoucherSearch();
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
            journalvoucher: this.journalvoucherService.getJournalVoucher()
          }).subscribe({
            next: ({ rights, journalvoucher }) => {
              if (rights.body) {
                this.userRights = rights.body;
                console.log(this.userRights);
              }
              if (journalvoucher) {
                this.journalvouchers = journalvoucher;
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
    this.journalvoucherService.getJournalVoucher().subscribe(b => { if (b) { this.journalvouchers = b } });
  }

  searchJournalVoucher() {
    this.journalvoucherService.search(this.journalvoucherSearch).subscribe(d => { if (d) { this.journalvouchers = d } });
  }

  trackId(index: number, item: IJournalVoucher): number {
    return item.ID ?? 0;
  }

  delete(journalvoucher: IJournalVoucher): void {
    const dialogRef = this.dialog.open(journalvoucherDeleteDialogComponent, {
      data: { journalvoucher }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAll();
      }
    });
  }
}
