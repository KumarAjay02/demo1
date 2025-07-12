// payable-list.component.ts
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

import { IPayable } from './model/payable.model';
import { PayableService } from './payable.service';
import { IPayableSearch, PayableSearch } from './model/payable-search.model';
import { PayableDeleteDialogComponent } from './payable-delete-dialog.component';
import {IUserRights} from '../../../../features/menu-access-master/user-rights.model';
import {IvMaster} from '../../../../features/menu-access-master/iv-master.model';
import {MenuAccessMasterService} from '../../../../features/menu-access-master/menu-access-master.service';

@Component({
  selector: 'app-payable-list',
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
  templateUrl: './payable-list.component.html'
})
export class PayableListComponent implements OnInit {
  payables: IPayable[] = [{
    Id: 1,
    SerialNo: 1001,
    CoCode: 'CO001',
    DivCode: 'DIV001',
    PayableForm: 'Form1',
    PayableId: 'PID001',
    PayableType: 'Vendor',
    PayableName: 'Sample Vendor',
    AssociationDate: new Date(),
    ActiveState: 'Active',
    PanNo: 'ABCDE1234F',
    AdhaarNo: '123456789012',
    CompanyType: 'Private',
    PayableCategory: 'Regular',
    AccountNo: '1234567890',
    IfscCode: 'SBIN0001234',
    BankName: 'State Bank of India',
    Remarks: 'Sample remarks',
    DeptType: 'Finance',
    Msme: 'Yes',
    EntryBy: 'Admin',
    EntryDate: new Date(),
    UpdatedBy: 'Admin',
    UpdatedDate: new Date()
  }];
  payableSearch: IPayableSearch;
  userRights?: IUserRights;
  private toastr = inject(ToastrService);

  constructor(
    private payableService: PayableService,
    private router: Router,
    private dialog: MatDialog,
    protected menuAccessMasterService: MenuAccessMasterService,
  ) {
    this.payableSearch = new PayableSearch();
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
          }).subscribe({
            next: ({ rights }) => {
              if(rights.body) {
                this.userRights = rights.body;
                console.log(this.userRights);
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

  loadAll(): void {
    // this.payableService.getPayableList().subscribe(p => {
    //   if (p) {
    //     this.payables = p;
    //   }
    // });
  }

  search(): void {
    this.payableService.payableSearch(this.payableSearch).subscribe(p => {
      if (p) {
        this.payables = p;
      }
    });
  }

  trackId(index: number, item: IPayable): number {
    return item.Id ?? 0;
  }

  delete(payable: IPayable): void {
    const dialogRef = this.dialog.open(PayableDeleteDialogComponent, {
      data: { payable }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAll();
      }
    });
  }
}
