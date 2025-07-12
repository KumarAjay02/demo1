import { CommonModule } from '@angular/common';
import { Component, inject,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { IAccount_Groups } from './model/ac-group.module';
 
import { AcGroupServiceService } from './ac-group.service';
 
import { MatDialog } from '@angular/material/dialog';
 
import { forkJoin } from 'rxjs';
import { AcGroupDeleteDialogComponent } from './ac-group-delete-dialog.component';
import { IvMaster } from '../../../../features/menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../../../../features/menu-access-master/menu-access-master.service';
import { IUserRights } from '../../../../features/menu-access-master/user-rights.model';


@Component({
  selector: 'app-ac-group-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './ac-group-list.component.html'
})
export class AcGroupListComponent implements OnInit {
  acGroups: IAccount_Groups[] = [];
  userRights?: IUserRights;
  private toastr = inject(ToastrService);

  constructor(
    private acGroupService: AcGroupServiceService,
    private router: Router,
    protected menuAccessMasterService: MenuAccessMasterService,
    private dialog: MatDialog
  ) { }

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
              acGroups: this.acGroupService.getAcGroups()
            }).subscribe({
              next: ({ rights, acGroups }) => {
                if (rights.body) {
                  this.userRights = rights.body;
                  console.log(this.userRights);
                }
                if (acGroups) {
                  this.acGroups = acGroups;
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
  loadAcGroups() {
    this.acGroupService.getAcGroups().subscribe(data => {
      this.acGroups = data;
    });
  }

  trackById(index: number, item: IAccount_Groups): number {
    return item.SerialNo ?? 0;
  }

  delete(acGroup: IAccount_Groups): void {
    const dialogRef = this.dialog.open(AcGroupDeleteDialogComponent, {
      data: { acGroup }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAcGroups();
      }
    });
  }
}
