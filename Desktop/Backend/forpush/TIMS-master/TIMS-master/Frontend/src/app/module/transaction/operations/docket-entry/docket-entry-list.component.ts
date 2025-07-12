import { Component, inject, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

import {DocketEntry, IDocketEntry} from './model/docket-entry.model';
import { IDocketEntrySearch, DocketEntrySearch } from './model/docket-entry-search.model';
 
import { DocketEntryService } from './docket-entry.service';
import { DocketDeleteDialogComponent } from './docket-delete-dialog.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { IvMaster } from '../../../../features/menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../../../../features/menu-access-master/menu-access-master.service';
import { IUserRights } from '../../../../features/menu-access-master/user-rights.model';

@Component({
  selector: 'app-docket-entry-list',
  templateUrl: './docket-entry-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatTooltipModule]
})
export class DocketEntryListComponent implements OnInit {
  dockets: IDocketEntry[] = [];
  docketSearch: IDocketEntrySearch = new DocketEntrySearch();
  userRights?: IUserRights;
  private toastr = inject(ToastrService);

  constructor(
    private docketService: DocketEntryService,
    private router: Router,
    protected menuAccessMasterService: MenuAccessMasterService,
    private dialog: MatDialog
  ) {
    this.addDefaultRowWithValue();
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
            //dockets: this.docketService.getAll()
          }).subscribe({
            next: ({ rights }) => {
              if (rights.body) this.userRights = rights.body;
              //this.dockets = dockets;
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
    setTimeout(() => this.router.navigate(['/dashboard']), 2000);
  }

  search(): void {
    // this.docketService.search(this.docketSearch).subscribe(res => {
    //   if (res) this.dockets = res;
    // });
  }

  loadAll(): void {
    this.docketService.getAll().subscribe(res => {
      if (res) this.dockets = res;
    });
  }

  trackId(index: number, item: IDocketEntry): number {
    return item.id ?? 0;
  }

  delete(entry: IDocketEntry): void {
    const dialogRef = this.dialog.open(DocketDeleteDialogComponent, {
      data: { entry }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAll();
      }
    });
  }
  addDefaultRowWithValue(): void {
    const row = new DocketEntry(
      1,                          // id
      '1000001',                   // docketNo
      '13-05-2025',               // bookingDate
      'Road',                     // bookingMode
      'Express',                  // serviceMode
      'Regular',                  // bookingBasis
      'Consignor',                // chequeBy
      'REF123',                   // pickupBy
      'N',                        // eod
      'Delhi',                    // delvBranch
      110001,                     // pinCode
      'Connaught Place',          // distance
      'No',                       // odaLoc
      'Door Delivery',            // delvType
      'C001',                     // consignorCode
      'ABC Pvt Ltd',              // consignorName
      '123 Street, Delhi',        // consignorAddress
      '011-12345678',             // consignorPhone
      '9876543210',               // consignorMobile
      'abc@example.com',          // consignorEmail
      'C002',                     // consigneeCode
      'XYZ Enterprises',          // consigneeName
      '456 Avenue, Mumbai',       // consigneeAddress
      '022-87654321',             // consigneePhone
      '9123456789',               // consigneeMobile
      'xyz@example.com',          // consigneeEmail
      'C003',                     // billingPartyCode
      'Billing Corp',             // billingPartyName
      '789 Road, Chennai',        // billingPartyAddress
      '044-11223344',             // billingPartyPhone
      '9988776655',               // billingPartyMobile
      'billing@example.com',      // billingPartyEmail
      2,                          // noOfInvoices
      'John',                     // markingBy
      '2025-05-13',               // pickupDate
      5,                          // totalPkgs
      120.5,                      // actualWeight
      110.0,                      // cftWeight
      115.0,                      // chargeableWeight
      'Boxed',                    // packing
      'Electronics',              // material
      'Insurance',                // privateMark
      'Smartphones',              // content
      'REQ001',                   // pickupReqNo
      'DC987',                    // dcNo
      'Handle with care',         // remarks
      'SystemUser',               // prepareBy
      'Y'                         // isActive
    );

    this.dockets.push(row);
  }
}
