import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

import { IRentLiabilityApproval, IRentLiabilityApprovalSearch, RentLiabilityApprovalSearch } from './model/rent-liability-approval.model';
import { RentLiabilityApprovalService } from './rent-liability-approval.service';
import { RentLiabilityApprovalDeleteDialogComponent } from './rent-liability-approval-delete-dialog.component';
import { IvMaster } from '../../../../features/menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../../../../features/menu-access-master/menu-access-master.service';
import { IUserRights } from '../../../../features/menu-access-master/user-rights.model';
 

@Component({
  selector: 'app-rent-liability-approval-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
    FontAwesomeModule,
    MatTooltipModule
  ],
  templateUrl: './rent-liability-approval-list.component.html'
})
export class RentLiabilityApprovalListComponent implements OnInit {
  approvals: IRentLiabilityApproval[] = [];
  filteredApprovals: IRentLiabilityApproval[] = [];
  pagedApprovals: IRentLiabilityApproval[] = [];
  searchParams: IRentLiabilityApprovalSearch = new RentLiabilityApprovalSearch();
  userRights?: IUserRights;
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  private toastr = inject(ToastrService);

  constructor(
    private approvalService: RentLiabilityApprovalService,
    private router: Router,
    private dialog: MatDialog,
    private menuAccessService: MenuAccessMasterService
  ) {}

  ngOnInit(): void {
    this.loadAll();
    this.checkUserRights();
  }

  checkUserRights(): void {
    const accessCheck = new IvMaster();
    accessCheck.code = this.router.url;

    this.menuAccessService.validate(accessCheck).subscribe({
      next: (message) => {
        if (message.body != null) {
          this.handleUnauthorized();
        } else {
          forkJoin({
            rights: this.menuAccessService.getAuthentications(accessCheck),
          }).subscribe({
            next: ({ rights }) => {
              if (rights.body) {
                this.userRights = rights.body;
              }
            },
            error: () => this.handleUnauthorized()
          });
        }
      },
      error: () => this.handleUnauthorized()
    });
  }

  handleUnauthorized(): void {
    this.toastr.error('You are not authorized to access this page');
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 2000);
  }

  loadAll(): void {
    this.approvalService.getApprovals().subscribe(approvals => {
      this.approvals = approvals;
      this.filteredApprovals = [...approvals];
      this.updatePagination();
    });
  }

  search(): void {
    this.approvalService.searchApprovals(this.searchParams).subscribe(approvals => {
      this.filteredApprovals = approvals;
      this.currentPage = 1;
      this.updatePagination();
    });
  }

  delete(approval: IRentLiabilityApproval): void {
    const dialogRef = this.dialog.open(RentLiabilityApprovalDeleteDialogComponent, {
      data: { approval }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAll();
      }
    });
  }

  trackId(index: number, item: IRentLiabilityApproval): number {
    return item.id ?? 0;
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredApprovals.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.pagedApprovals = this.filteredApprovals.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getPages(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    const lastPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (lastPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, lastPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= lastPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
}
