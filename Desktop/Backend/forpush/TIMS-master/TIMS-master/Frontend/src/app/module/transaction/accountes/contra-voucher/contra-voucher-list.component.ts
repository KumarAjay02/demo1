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
 
import { IContraVoucher } from '../contra-voucher/model/contra-voucher.module';
import { ContraVoucherSearch, IContraVoucherSearch } from '../contra-voucher/model/contra-voucher-search.module';
import { contravoucherDeleteDialogComponent } from '../contra-voucher/contra-voucher-delete-dialog.component';
import { contraVoucherService } from '../contra-voucher/contra-voucher.service';
import { IUserRights } from '../../../../features/menu-access-master/user-rights.model';
import { IvMaster } from '../../../../features/menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../../../../features/menu-access-master/menu-access-master.service';


@Component({
  selector: 'app-contra-voucher-list',
  templateUrl: './contra-voucher-list.component.html',
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
export class ContraVoucherListComponent implements OnInit {
  contraVouchers: IContraVoucher[] = [];
  userRights?: IUserRights;
  contraVoucherSearch: IContraVoucherSearch;
  private toastr = inject(ToastrService);


  constructor(
    private contraVoucherService: contraVoucherService,
    private router: Router,
    protected menuAccessMasterService: MenuAccessMasterService,
    private dialog: MatDialog
  ) {
    this.contraVoucherSearch = new ContraVoucherSearch();
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
            contravoucher: this.contraVoucherService.getContraVoucher()
          }).subscribe({
            next: ({ rights, contravoucher }) => {
              if (rights.body) {
                this.userRights = rights.body;
                console.log(this.userRights);
              }
              if (contravoucher) {
                this.contraVouchers = contravoucher;
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
    this.contraVoucherService.getContraVoucher().subscribe(b => { if (b) { this.contraVouchers = b } });
  }

  searchContraVoucher() {
    this.contraVoucherService.search(this.contraVoucherSearch).subscribe(d => { if (d) { this.contraVouchers = d } });
  }

  trackId(index: number, item: IContraVoucher): number {
    return item.ID ?? 0;
  }

  delete(account: IContraVoucher): void {
    const dialogRef = this.dialog.open(contravoucherDeleteDialogComponent, {
      data: { account }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAll();
      }
    });
  }
}
