import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ICustomer } from './model/customer.model';
import { CustomerService } from './customer.service';
import { CommonModule } from '@angular/common';
 
import { CustomerDeleteDialogComponent } from './customer-delete-dialog.component';
 
import { forkJoin } from 'rxjs';
import { ICustomerSearch, CustomerSearch } from './model/customer-search.model';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import {saveAs} from 'file-saver';
import { IvMaster } from '../../../../features/menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../../../../features/menu-access-master/menu-access-master.service';
import { IUserRights } from '../../../../features/menu-access-master/user-rights.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
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
})
export class CustomerListComponent implements OnInit {
  customers: ICustomer[] = [];
  userRights?: IUserRights;
  customerSearch: ICustomerSearch;
  private toastr = inject(ToastrService);

  constructor(
    private customerService: CustomerService,
    private router: Router,
    protected menuAccessMasterService: MenuAccessMasterService,
    private dialog: MatDialog
  ) {
    this.customerSearch = new CustomerSearch();
  }

  ngOnInit() {
    const accessCheck = new IvMaster();
    accessCheck.code = this.router.url;

    this.menuAccessMasterService.validate(accessCheck).subscribe({
      next: (message) => {
        if (message.body != null) {
          this.handleUnauthorized();
        } else {
          forkJoin({
            rights: this.menuAccessMasterService.getAuthentications(accessCheck),
            customers: this.customerService.getCustomerList()
          }).subscribe({
            next: ({ rights, customers }) => {
              if (rights.body) {
                this.userRights = rights.body;
                console.log("rights",this.userRights);
              }
              this.customers = customers || [];
            },
            error: () => this.handleUnauthorized()
          });
        }
      },
      error: () => this.handleUnauthorized()
    });
  }

  loadAll() {
    this.customerService.getCustomerList().subscribe({
      next: (customers) => {
        this.customers = customers || [];
      },
      error: (err) => {
        this.toastr.error('Failed to load customers');
      }
    });
  }

  handleUnauthorized() {
    this.toastr.error('You are not authorized to access this page');
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 2000);
  }

  search() {
    this.customerService.customerSearch(this.customerSearch).subscribe({
      next: (customers) => {
        this.customers = customers || [];
      },
      error: (err) => {
        this.toastr.error('Search failed');
        console.error(err);
      }
    });
  }

  trackId(index: number, item: ICustomer): string {
    return `${item.coCode}-${item.divCode}-${item.customerCode}`;
  }

  delete(customer: ICustomer): void {
    const dialogRef = this.dialog.open(CustomerDeleteDialogComponent, {
      data: { customer }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAll();
      }
    });
  }
  exportAsExcel() {
    // this.spinner.show();
    this.customerSearch.fileType="xlsx"
    this.customerService.downloadList(this.customerSearch).subscribe(
      res => {
        saveAs(res, 'Customer.xlsx');
        // this.spinner.hide();
      },
      () => {
        // this.spinner.hide();
      },
    );
  }

  exportAsPdf() {
    this.customerSearch.fileType="pdf"
    this.customerService.downloadList(this.customerSearch).subscribe(
      res => {
        saveAs(res, 'Customer.pdf');
      },
      () => {
        // this.spinner.hide();
      },
    );
  }
  page = 1;
  pageSize = 8;
  pageSizeOptions = [5, 10, 20, 50, 100];
  get totalPages(): number {
    return Math.ceil(this.customers.length / this.pageSize);
  }

  paginatedCities(): any[] {
    const start = (this.page - 1) * this.pageSize;
    return this.customers.slice(start, start+this.pageSize);
  }

  setPage(pageNumber: number): void {
    if (pageNumber < 1 || pageNumber > this.totalPages) return;
    this.page = pageNumber;
  }

  protected readonly Math = Math;
}
