import { Component, inject, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { BookingBasisMaster } from './models/bookingbasicmst.model';
import { FormsModule, } from '@angular/forms';
import { BookingbasicmstService } from './services/bookingbasicmst.service';
import { MenuAccessMasterService } from '../../../features/menu-access-master/menu-access-master.service';
import { ToastrService } from 'ngx-toastr';
import { IUserRights } from '../../../features/menu-access-master/user-rights.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IvMaster } from '../../../features/menu-access-master/iv-master.model';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-booking-basicmst',
  imports: [CommonModule, MatTooltipModule, RouterLink, FormsModule],
  templateUrl: './booking-basicmst.component.html',
  styleUrl: './booking-basicmst.component.css'
})
export class BookingBasicmstComponent  implements  OnInit {  
      //start
        private router = inject(Router);
        private _service = inject(BookingbasicmstService);
        private toastr = inject(ToastrService);
        private menuAccessMasterService = inject(MenuAccessMasterService);
        bookingbasisMst: BookingBasisMaster[] = [];
        filteredbookingbasisMst: BookingBasisMaster[] = [];
        private originalbookingbasisMst: BookingBasisMaster[] = [];
        userRights?: IUserRights;
        searchCode: string = '';
        searchDescription: string = '';

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
                    packingmst: this._service.getBookingBasisList()
                  }).subscribe({
                    next: ({ rights, packingmst }) => {
                      if (rights.body) {
                        this.userRights = rights.body;
                      }
                      if (packingmst) {
                        this.bookingbasisMst = packingmst;
                        this.originalbookingbasisMst = [...packingmst]; // for filtering
                        this.filteredbookingbasisMst = [...packingmst]; // for filtered view
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
  BtnView(code: string): void {
    this.router.navigateByUrl('bookingbasicmst/view/' + code);
  }
  BtnUpdate(code: string): void {
    this.router.navigateByUrl('bookingbasicmst/edit/' + code);
  }
   BtnDelete(code: string): void {
    if (!code) return;
    if (confirm(`Are you sure you want to delete code: ${code}?`)) {
      this._service.Delete(code).subscribe({
        next: () => {
          this.toastr.success(`BookingBasicMode deleted successfully`);
          this.loadAll(); // reload list
        },
        error: () => {
          this.toastr.error(`Error deleting bookingBasisMode`);
        }
      });
    }
  }
  loadAll(): void {
  this._service.getBookingBasisList().subscribe({
    next: (data: BookingBasisMaster[]) => {
      console.log('Booking basis list:', data);
      this.bookingbasisMst = data;
        this.originalbookingbasisMst = [...data];
        this.filteredbookingbasisMst = [...data];
    },
    error: (err: HttpErrorResponse) => {
      this.toastr.error('Failed to load booking basis list');
      console.error(`Error ${err.status}: ${err.message}`, err.error);
    }
  });
  }


  search(): void {
    this.filteredbookingbasisMst = this.bookingbasisMst.filter(item =>
      (!this.searchCode || item.code?.toLowerCase().includes(this.searchCode.toLowerCase())) &&
      (!this.searchDescription || item.description.toLowerCase().includes(this.searchDescription.toLowerCase()))
    );
  }

  
}

