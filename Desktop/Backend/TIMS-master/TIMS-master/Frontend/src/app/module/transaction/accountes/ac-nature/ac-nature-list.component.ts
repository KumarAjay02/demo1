import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Account_NatureSearch, IAccount_Nature, IAccount_NatureSearch } from './model/ac-nature.model';
import { AcNatureService } from './ac-nature.service';
import { MatDialog } from '@angular/material/dialog';
import { AcNatureDeleteDialogComponent } from './ac-nature-delete-dialog.component';
 
import { forkJoin } from 'rxjs';
 
import { saveAs } from 'file-saver';
import { IvMaster } from '../../../../features/menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../../../../features/menu-access-master/menu-access-master.service';
import { IUserRights } from '../../../../features/menu-access-master/user-rights.model';

@Component({
  selector: 'app-ac-nature-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './ac-nature-list.component.html'
})
export class AcNatureComponent implements OnInit {
  acNatures: IAccount_Nature[] = [];
  userRights?: IUserRights;
  acNatureSearch: IAccount_NatureSearch;
  private toastr = inject(ToastrService);


  constructor(
    private acNatureService: AcNatureService,
    private router: Router,
    protected menuAccessMasterService: MenuAccessMasterService,
    private dialog: MatDialog
  ) {
    this.acNatureSearch = new Account_NatureSearch();
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
            acNature: this.acNatureService.getAcNatureList()
          }).subscribe({
            next: ({ rights, acNature }) => {
              if (rights.body) {
                this.userRights = rights.body;
                console.log(this.userRights);
              }
              if (acNature) {
                this.acNatures = acNature;
              }
              //console.log("i",this.acNatures);
            },
            error: () => this.handleUnauthorized()
          });
        }
      },
      error: () => this.handleUnauthorized()
    });
    //console.log("j",this.acNatures);
  }

  handleUnauthorized() {
    this.toastr.error('You are not authorized to access this page');
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 2000);
  }

  loadAcNature() {
    this.acNatureService.getAcNatureList().subscribe(acNature => { if (acNature) { this.acNatures = acNature; } });
  }

  search() {
    this.acNatureService.acNatureSearch(this.acNatureSearch).subscribe(acNature => {
      if (acNature) {
        this.acNatures = acNature
      }
    });
    this.acNatureSearch.accountNature ='0';
  }

  trackById(index: number, item: IAccount_Nature): number {
    return item.accountNature ?? 0;
  }

  delete(acNature: IAccount_Nature): void {
    const dialogRef = this.dialog.open(AcNatureDeleteDialogComponent, {
      data: { acNature }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAcNature();
      }
    });
  }

  exportAsExcel() {
    // this.spinner.show();
    this.acNatureSearch.fileType = "xlsx"
    this.acNatureService.downloadList(this.acNatureSearch).subscribe(
      res => {
        saveAs(res, 'AccountNature.xlsx');
        // this.spinner.hide();
      },
      () => {
        // this.spinner.hide();
      },
    );
  }

  exportAsPdf() {
    this.acNatureSearch.fileType = "pdf"
    this.acNatureService.downloadList(this.acNatureSearch).subscribe(
      res => {
        saveAs(res, 'AccountNature.pdf');
      },
      () => {
        // this.spinner.hide();
      },
    );
  }
}

