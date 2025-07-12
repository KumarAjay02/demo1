import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialog } from '@angular/material/dialog';
import { ACScheduleService } from './ac-schedule.service';
import { IAC_Schedule } from './model/ac-schedule.model';
 
import { AC_ScheduleSearch, IAC_ScheduleSearch } from './model/ac-schedule-search.model';
 
import { forkJoin } from 'rxjs';
 
import { AcScheduleDeleteDialogComponent } from './ac-schedule-delete-dialog.component';
import saveAs from 'file-saver';
import { IAccount_Nature } from '../ac-nature/model/ac-nature.model';
import { IvMaster } from '../../../../features/menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../../../../features/menu-access-master/menu-access-master.service';
import { IUserRights } from '../../../../features/menu-access-master/user-rights.model';


@Component({
  selector: 'app-ac-schedule-list',
  imports: [CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatSnackBarModule,
    MatIconModule,
    FontAwesomeModule,
    MatTooltipModule],

  templateUrl: './ac-schedule-list.component.html'
})
export class ACScheduleListComponent implements OnInit {
  acNatures: IAccount_Nature[] = [];
  glAcSchedules: IAC_Schedule[] = [];
  userRights?: IUserRights;
  scheduleSearch: IAC_ScheduleSearch;
  private toastr = inject(ToastrService);
 

  constructor(
    private acScheduleService: ACScheduleService,
    private router: Router,
    protected menuAccessMasterService: MenuAccessMasterService,
    private dialog: MatDialog
  ) {
    this.scheduleSearch = new AC_ScheduleSearch();
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
            schedules: this.acScheduleService.getAcScheduleList()
          }).subscribe({
            next: ({ rights, schedules }) => {
              if (rights.body) {
                this.userRights = rights.body;
                console.log(this.userRights);
              }
              if (schedules) {
                this.glAcSchedules = schedules;

                this.acScheduleService.acNatureFilter('').subscribe(results => {
                  this.acNatures = results.body ?? [];
                });

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
    this.acScheduleService.getAcScheduleList().subscribe(schedule => { if (schedule) { this.glAcSchedules = schedule } });
  }

  search() {
      this.acScheduleService.acScheduleSearch(this.scheduleSearch).subscribe(schedule => {
        if (schedule) {
        this.glAcSchedules = schedule
      }

    });
  }
  trackId(index: number, item: IAC_Schedule): number {
    return item.scheduleCode ?? 0;
  }

  delete(schedule: IAC_Schedule): void {
    const dialogRef = this.dialog.open(AcScheduleDeleteDialogComponent, {
      data: { schedule }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAll();
      }
    });
  }

  exportAsExcel() {
    // this.spinner.show();
    this.scheduleSearch.fileType = "xlsx"
    this.acScheduleService.downloadList(this.scheduleSearch).subscribe(
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
    this.scheduleSearch.fileType = "pdf"
    this.acScheduleService.downloadList(this.scheduleSearch).subscribe(
      res => {
        saveAs(res, 'AccountNature.pdf');
      },
      () => {
        // this.spinner.hide();
      },
    );
  }
}
