// road-tcs-list.component.ts
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

import { IRoadTcs } from './model/road-tcs.model';
import { RoadTcsService } from './road-tcs.service';
import { IRoadTcsSearch, RoadTcsSearch } from './model/road-tcs-search.model';
import { RoadTcsDeleteDialogComponent } from './road-tcs-delete-dialog.component';
import { IvMaster } from '../../../../features/menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../../../../features/menu-access-master/menu-access-master.service';
import { IUserRights } from '../../../../features/menu-access-master/user-rights.model';
 

@Component({
  selector: 'app-road-tcs-list',
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
  templateUrl: './road-tcs-list.component.html'
})
export class RoadTcsListComponent implements OnInit {
  roadTcsList: IRoadTcs[] = [{
    id: 1,
    date: new Date().toISOString().split('T')[0],
    vehicleNumber: 'MH01AB1234',
    panNo: 'ABCDE1234F',
    driverName: 'John Doe',
    vehicleSize: '20FT',
    sealNumber: 'SEAL12345',
    challanType: 'Regular',
    remarks: 'Sample remarks',
    toBranch: 'Mumbai',
    payableName: 'ABC Transport',
    vendorBrokerName: 'XYZ Broker',
    driverNo: '9876543210',
    route: 'Mumbai-Delhi',
    weightGuarantee: 1000,
    noOfTouchingPoint: 2,
    lorryHire: 15000,
    extraAmount: 2000,
    advance: 5000,
    balance: 12000,
    tdsApplicable: true,
    kantaVajan: 'कांटा वजन'
  }];
  roadTcsSearch: IRoadTcsSearch;
  userRights?: IUserRights;
  private toastr = inject(ToastrService);

  constructor(
    private roadTcsService: RoadTcsService,
    private router: Router,
    private dialog: MatDialog,
    protected menuAccessMasterService: MenuAccessMasterService,
  ) {
    this.roadTcsSearch = new RoadTcsSearch();
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
    this.roadTcsService.getRoadTcsList().subscribe(r => {
      if (r) {
        this.roadTcsList = r;
      }
    });
  }

  search(): void {
    this.roadTcsService.search(this.roadTcsSearch).subscribe(r => {
      if (r) {
        this.roadTcsList = r;
      }
    });
  }

  trackId(index: number, item: IRoadTcs): number {
    return item.id ?? 0;
  }

  delete(roadTcs: IRoadTcs): void {
    const dialogRef = this.dialog.open(RoadTcsDeleteDialogComponent, {
      data: { roadTcs }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAll();
      }
    });
  }
}
