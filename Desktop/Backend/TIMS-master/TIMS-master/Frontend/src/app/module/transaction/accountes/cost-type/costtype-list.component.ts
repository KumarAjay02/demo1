import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { forkJoin } from 'rxjs';
 
import { ToastrService } from 'ngx-toastr';
 
import { MatDialog } from '@angular/material/dialog';
 
import { ICostType } from './model/costtype.module';
import { CostTypeSearch, ICostTypeSearch } from './model/costtype-search.module';
import { CosttypeDeleteDialogComponent } from './costtype-delete-dialog.component';
import { CostTypeService } from './costtype.service';
import saveAs from 'file-saver';
import { IvMaster } from '../../../../features/menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../../../../features/menu-access-master/menu-access-master.service';
import { IUserRights } from '../../../../features/menu-access-master/user-rights.model';

@Component({
  selector: 'app-costtype-list',
  templateUrl: './costtype-list.component.html',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
    FontAwesomeModule,
    MatTooltipModule
  ]
})
export class CosttypeListComponent implements OnInit {

  costtypes: ICostType[] = [];
  userRights?: IUserRights;
  costtypeSearch: ICostTypeSearch;
  private toastr = inject(ToastrService);

  constructor(
    private costtypeService: CostTypeService,
    private router: Router,
    protected menuAccessMasterService: MenuAccessMasterService,
    private dialog: MatDialog
  ) {
    this.costtypeSearch = new CostTypeSearch();
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
            CostType: this.costtypeService.getCostTypeList()
          }).subscribe({
            next: ({ rights, CostType }) => {
              if (rights.body) {
                this.userRights = rights.body;
                console.log(this.userRights);
              }
              if (CostType) {
                this.costtypes = CostType;
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

  loadAll() {
    this.costtypeService.getCostTypeList().subscribe(costtype => { if (costtype) { this.costtypes = costtype } });
  }

  search() {
    this.costtypeService.Search(this.costtypeSearch).subscribe(costtype => {
      if (costtype) {
        this.costtypes = costtype
      }
    });
  }

  trackId(index: number, item: ICostType): number {
    return item.costCodeId ?? 0;
  }

  delete(costtype: ICostType): void {
    const dialogRef = this.dialog.open(CosttypeDeleteDialogComponent, {
      data: { costtype }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAll();
      }
    });
  }
  exportAsExcel() {
    // this.spinner.show();
    this.costtypeSearch.fileType = "xlsx"
    this.costtypeService.downloadList(this.costtypeSearch).subscribe(
      res => {
        saveAs(res, 'AccountSchedule.xlsx');
        // this.spinner.hide();
      },
      () => {
        // this.spinner.hide();
      },
    );
  }
  exportAsPdf() {
    this.costtypeSearch.fileType = "pdf"
    this.costtypeService.downloadList(this.costtypeSearch).subscribe(
      res => {
        saveAs(res, 'AccountNature.pdf');
      },
      () => {
        // this.spinner.hide();
      },
    );
  }
}
