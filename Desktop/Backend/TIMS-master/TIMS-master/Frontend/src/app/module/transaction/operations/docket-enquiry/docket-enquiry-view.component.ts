//docket-enquiry-view.component.ts
import { Component, inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import { DocketEnquirySearch, IDocketEnquirySearch } from './model/docket-enquiry-search.model';
 
import { NgFor, NgIf } from '@angular/common';
import { IBILL_DTLS, ICHALLAN_DTLS, IDELIVERY_DTLS, IDWB_DTLS, IDWB_MSTS, IFREIGHT_DTLS, IINV_DTLS, IPOD_DTLS } from './model/docket-enquiry.model';
import { MatDialog } from '@angular/material/dialog';
 
import { DocketEnquiryService } from './docket-enquiry.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { IvMaster } from '../../../../features/menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../../../../features/menu-access-master/menu-access-master.service';
import { IUserRights } from '../../../../features/menu-access-master/user-rights.model';


@Component({
  selector: 'app-docket-enquiry-view',
  templateUrl: './docket-enquiry-view.component.html',
  imports: [
    ReactiveFormsModule,
    MatTooltipModule,
    FormsModule,
    NgFor,
    NgIf
  ]
})
export class DocketEnquiryViewComponent implements OnInit {
  companies = ['Suntek Axpress'];
  divisions = ['Freight'];
  dwbMsts: IDWB_MSTS[] = [];
  //dwbDtls: IDWB_DTLS[] = [];
  //invDtls: IINV_DTLS[] = [];
  //challanDtls: ICHALLAN_DTLS[] = [];
  //deliveryDtls: IDELIVERY_DTLS[] = [];
  //frightDtls: IFREIGHT_DTLS[] = [];
  //billDtls: IBILL_DTLS[] = [];
  //podDtls: IPOD_DTLS[] = [];
  searchParams: IDocketEnquirySearch = new DocketEnquirySearch();
  userRights?: IUserRights;
  private toastr = inject(ToastrService);

  constructor(
    private docketEnquiryService: DocketEnquiryService,
    private router: Router,
    private dialog: MatDialog,
    private menuAccessService: MenuAccessMasterService
  ) { }


  ngOnInit(): void {
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

  trackId(index: number, item: IDWB_MSTS): number {
    return item.DWBNO ?? 0;
  }

  search(): void {
    this.docketEnquiryService.searchDocketEnquiry(this.searchParams).subscribe(enquiry => { this.dwbMsts = enquiry; });
  }
}

