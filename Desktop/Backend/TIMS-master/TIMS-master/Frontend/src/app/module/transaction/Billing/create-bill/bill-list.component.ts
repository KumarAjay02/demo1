// bill-list.component.ts
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

import { IBill } from './model/bill.model';
import {IBillSearch, BillSearch} from './model/bill-search.model'
import { BillService } from './bill.service';
import { BillDeleteDialogComponent } from './bill-delete-dialog.component';
import { IvMaster } from '../../../../features/menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../../../../features/menu-access-master/menu-access-master.service';
import { IUserRights } from '../../../../features/menu-access-master/user-rights.model';
 

@Component({
  selector: 'app-bill-list',
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
  templateUrl: './bill-list.component.html'
})
export class BillListComponent implements OnInit {
  bills: IBill[] = [];
  filteredBills: IBill[] = [];
  billSearch: IBillSearch = new BillSearch();
  userRights?: IUserRights;
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  private toastr = inject(ToastrService);

  constructor(
    private billService: BillService,
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
    this.billService.getBillList().subscribe(bills => {
      this.bills = bills;
      this.filteredBills = [...bills];
      this.updatePagination();
    });
  }

  search(): void {
    this.billService.searchBills(this.billSearch).subscribe(bills => {
      this.filteredBills = bills;
      this.currentPage = 1;
      this.updatePagination();
    });
  }

  delete(bill: IBill): void {
    const dialogRef = this.dialog.open(BillDeleteDialogComponent, {
      data: { bill }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAll();
      }
    });
  }

  trackId(index: number, item: IBill): number {
    return item.id ?? 0;
  }

  // Pagination methods
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredBills.length / this.itemsPerPage);
  }

  getPaginatedBills(): IBill[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredBills.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getPages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
