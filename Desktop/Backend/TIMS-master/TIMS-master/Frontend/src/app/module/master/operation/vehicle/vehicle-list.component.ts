// vehicle-list.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VehicleService } from './vehicle.service';
import { IVehicle } from './model/vehicle.model';
import { VehicleDeleteDialogComponent } from './vehicle-delete-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { IvMaster } from '../../../../features/menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../../../../features/menu-access-master/menu-access-master.service';
import { IUserRights } from '../../../../features/menu-access-master/user-rights.model';
 

@Component({
    selector: 'app-vehicle-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MatIconModule,
        MatTooltipModule
    ],
    templateUrl: './vehicle-list.component.html'
})
export class VehicleListComponent implements OnInit {
  userRights?: IUserRights;
    vehicles: IVehicle[] = [{
      id: 1,
      coCode: 'CO001',
      divCode: 'DIV001',
      vehicleNo: 'MH01AB1234',
      chasisNo: 'CH1234567890XYZ',
      engineNo: 'EN9876543210ABC',
      ownerName: 'John Doe',
      mobileNo: '9876543210',
      vehicleModel: 'Tata Ultra 1518',
      vehicleYear: '2022',
      actualCapacity: '15 Tons',
      caringCapacity: '12 Tons',
      flag: true
    },
      {
        id: 2,
        coCode: 'CO001',
        divCode: 'DIV001',
        vehicleNo: 'MH02CD5678',
        chasisNo: 'CH0987654321XYZ',
        engineNo: 'EN1234567890ABC',
        ownerName: 'Jane Smith',
        mobileNo: '8765432109',
        vehicleModel: 'Ashok Leyland 1616',
        vehicleYear: '2021',
        actualCapacity: '16 Tons',
        caringCapacity: '14 Tons',
        flag: false
      }];
    private toastr = inject(ToastrService);

    constructor(
        private vehicleService: VehicleService,
        private router: Router,
        private dialog: MatDialog,
        protected menuAccessMasterService: MenuAccessMasterService,
    ) {}


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
            // customers: this.customerService.getCustomerList()

          }).subscribe({
            next:
              (
                { rights,  }) => {
                if (rights.body) {
                  this.userRights = rights.body;
                }
                // if (customers) {
                //   this.customers = customers;
                // }
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


  loadVehicles() {
        this.vehicleService.getVehicles().subscribe(data => {
            this.vehicles = data;
        });
    }

    trackById(index: number, item: IVehicle): number {
        return item.id ?? 0;
    }

    delete(vehicle: IVehicle): void {
        const dialogRef = this.dialog.open(VehicleDeleteDialogComponent, {
            data: { vehicle }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadVehicles();
            }
        });
    }
}
