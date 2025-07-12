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
 
import { voucherentryService } from './voucherentry.service';
import { voucherentryDeleteDialogComponent } from './voucherentry-delete-dialog.component';
import { IVoucherEntry, IVoucherEntrySearch, VoucherEntrySearch } from './model/voucherentry.module';
import { IvMaster } from '../../../../features/menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../../../../features/menu-access-master/menu-access-master.service';
import { IUserRights } from '../../../../features/menu-access-master/user-rights.model';


@Component({
  selector: 'app-voucherentry-list',
  templateUrl: './voucherentry-list.component.html',
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
export class voucherentryListComponent implements OnInit {
  VoucherEntries: IVoucherEntry[] = [];
  userRights?: IUserRights;
  VoucherEntrySearch: IVoucherEntrySearch;
  private toastr = inject(ToastrService);


  constructor(
    private voucherentryService: voucherentryService,
    private router: Router,
    protected menuAccessMasterService: MenuAccessMasterService,
    private dialog: MatDialog
  ) {
    this.VoucherEntrySearch = new VoucherEntrySearch();
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
            voucherentry: this.voucherentryService.getVoucherEntry()
          }).subscribe({
            next: ({ rights, voucherentry }) => {
              if (rights.body) {
                this.userRights = rights.body;
                console.log(this.userRights);
              }
              if (voucherentry) {
                this.VoucherEntries = voucherentry;
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
    this.voucherentryService.getVoucherEntry().subscribe(b => { if (b) { this.VoucherEntries = b } });
  }

  searchVoucherEntry() {
    this.voucherentryService.search(this.VoucherEntrySearch).subscribe(d => { if (d) { this.VoucherEntries = d } });
  }

  trackId(index: number, item: IVoucherEntry): number {
    return item.ID ?? 0;
  }

  delete(voucherentry: IVoucherEntry): void {
    const dialogRef = this.dialog.open(voucherentryDeleteDialogComponent, {
      data: { voucherentry }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAll();
      }
    });
  }
}
