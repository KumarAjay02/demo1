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
 
import { IInterBranchFundTransfer } from './model/interbranch-ft.module';
import { IInterBranchFundTransferSearch, InterBranchFundTransferSearch } from './model/interbranch-ft-search.module';
import { InterBranchFundTransferService } from './interbranch-ft.service';
import { InterBranchFundTransferDeleteDialogComponent } from './interbranch-ft-delete-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { IvMaster } from '../../../../features/menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../../../../features/menu-access-master/menu-access-master.service';
import { IUserRights } from '../../../../features/menu-access-master/user-rights.model';



@Component({
  selector: 'app-interbranch-ft-list',
  templateUrl: './interbranch-ft-list.component.html',
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
export class InterBranchFundTransferListComponent implements OnInit {
  interBranchFundTransfers: IInterBranchFundTransfer[] = [];
  userRights?: IUserRights;
  InterBranchFundTransferSearch: IInterBranchFundTransferSearch;
  private toastr = inject(ToastrService);


  constructor(
    private interBranchFundTransferService: InterBranchFundTransferService,
    private router: Router,
    protected menuAccessMasterService: MenuAccessMasterService,
    private dialog: MatDialog
  ) {
    this.InterBranchFundTransferSearch = new InterBranchFundTransferSearch();
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
            interBranchFundTransfer: this.interBranchFundTransferService.getInterBranchFundTransfer()
          }).subscribe({
            next: ({ rights, interBranchFundTransfer }) => {
              if (rights.body) {
                this.userRights = rights.body;
                console.log(this.userRights);
              }
              if (interBranchFundTransfer) {
                this.interBranchFundTransfers = interBranchFundTransfer;
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
    this.interBranchFundTransferService.getInterBranchFundTransfer().subscribe(b => { if (b) { this.interBranchFundTransfers = b } });
  }

  searchInterBranchFundTransfer() {
    this.interBranchFundTransferService.search(this.InterBranchFundTransferSearch).subscribe(d => { if (d) { this.interBranchFundTransfers = d } });
  }

  trackId(index: number, item: IInterBranchFundTransfer): number {
    return item.ID ?? 0;
  }

  delete(interBranchft: IInterBranchFundTransfer): void {
    const dialogRef = this.dialog.open(InterBranchFundTransferDeleteDialogComponent, {
      data: { interBranchft }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAll();
      }
    });
  }
}
