// challan-list.component.ts
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

import { IChallanEntry } from './model/challan.model';
import { ChallanService } from './challan.service';
import { IChallanSearch, ChallanSearch } from './model/challan-search.model';
import { ChallanDeleteDialogComponent } from './challan-delete-dialog.component';
import { IvMaster } from '../../../../features/menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../../../../features/menu-access-master/menu-access-master.service';
import { IUserRights } from '../../../../features/menu-access-master/user-rights.model';
 

@Component({
  selector: 'app-challan-list',
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
  templateUrl: './challan-list.component.html'
})
export class ChallanListComponent implements OnInit {
  challans: IChallanEntry[] = [{
    challanNumber:'123',
    challanType: 'LONGROUTE',
    id: 1,
    date: '14/05/2025',
    toBranch: 'Mumbai',
    mode: 'ROAD',
    route: 'Delhi to Mumbai',
    vehicleNumber: 'MH12AB1234',
    sealNo: 'SEAL9876',
    docketNo: 'DKT123456',
    remark: 'Handle with care',
    pDate: '2025-05-14',
    pVehicleNumber: 'MH12CD5678',
    pConsEwayBill: 'EWB1234567890',
    LDate: '2025-05-14',
    LToBranch: 'Pune',
    LDataTransfer: 'Yes',
    LVehicleNumber: 'MH14EF9012',
    LTCSNo: 'TCS998877',
    LDocketNo: 'LDKT456789',
    LSDate: '2025-05-14',
    LSVehicleNumber: 'MH16GH3456',
    LSdocketNo: 'LSDKT654321',
    dDate:'15-05-2025',
    dDocketNo:'test',
    dVehicleNumber:'MH16GH3456',
    entryBy: 'admin',
    entryDate: '2025-05-14',
    updatedBy: 'supervisor',
    updatedDate: '2025-05-14'
  },{
    challanNumber:'1234',
    challanType: 'DRS',
    id: 2,
    date: '15/05/2025',
    toBranch: 'Mumbai',
    mode: 'ROAD',
    route: 'Delhi to Mumbai',
    vehicleNumber: 'MH12AB1234',
    sealNo: 'SEAL9876',
    docketNo: 'DKT123456',
    remark: 'Handle with care',
    pDate: '2025-05-14',
    pVehicleNumber: 'MH12CD5678',
    pConsEwayBill: 'EWB1234567890',
    LDate: '2025-05-14',
    LToBranch: 'Pune',
    LDataTransfer: 'Yes',
    LVehicleNumber: 'MH14EF9012',
    LTCSNo: 'TCS998877',
    LDocketNo: 'LDKT456789',
    LSDate: '2025-05-14',
    LSVehicleNumber: 'MH16GH3456',
    LSdocketNo: 'LSDKT654321',
    dDate:'15-05-2025',
    dDocketNo:'test',
    dVehicleNumber:'MH16GH3456',
    entryBy: 'admin',
    entryDate: '2025-05-14',
    updatedBy: 'supervisor',
    updatedDate: '2025-05-14'
  }];
  challanSearch: IChallanSearch;
  userRights?: IUserRights;
  private toastr = inject(ToastrService);

  constructor(
    private challanService: ChallanService,
    private router: Router,
    private dialog: MatDialog,
    protected menuAccessMasterService: MenuAccessMasterService,
  ) {
    this.challanSearch = new ChallanSearch("","","","");
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

  handleUnauthorized() {
    this.toastr.error('You are not authorized to access this page');
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 2000);
  }

  loadAll(): void {
    this.challanService.getChallanList().subscribe(c => {
      if (c) {
        this.challans = c;
      }
    });
  }

  search(): void {

      this.challanService.search(this.challanSearch).subscribe(c => {
        if (c) {
          this.challans = c;
        }
      });

  }

  trackId(index: number, item: IChallanEntry): number {
    return item.id ?? 0;
  }

  delete(challan: IChallanEntry): void {
    const dialogRef = this.dialog.open(ChallanDeleteDialogComponent, {
      data: { challan }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAll();
      }
    });
  }
}
