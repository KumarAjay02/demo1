import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';

import { IRights } from './model/rights.model';
import { RightsService } from './rights.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IvMaster } from '../menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../menu-access-master/menu-access-master.service';
import {ToastrService} from 'ngx-toastr';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { IUserRights } from '../menu-access-master/user-rights.model';
import { IUsers } from './model/users.model';
import {FormBuilder, FormGroup, FormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-rights-list',
  templateUrl: './rights-list.component.html',
  standalone: true,
  styleUrls: ['./rights-update.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
    FontAwesomeModule,
    MatTooltipModule,]
})
export class RightsListComponent implements OnInit {
  editForm: FormGroup;
  rights: IRights[] = [];
  private toastr = inject(ToastrService);
  userRights?: IUserRights;
  userList?: IUsers[]=[];
  selectedUserId?:number;
  constructor(
    private RightsService: RightsService,
    private router: Router,
    protected menuAccessMasterService: MenuAccessMasterService,
    private fb: FormBuilder,
  ) {
    this.editForm = this.fb.group({
      chkviewall: [],
      chkaddall: [],
      chkeditall: [],
      chkdeleteall: [],
      chkprintall: [],
      chksearchall: [],
      chkactiveall: [],
      chkapprovalall: [],
    });
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
            allUsers: this.RightsService.getUserList()
          }).subscribe({
            next: ({ rights,allUsers }) => {
              if(rights.body) {
                this.userRights = rights.body;
              }
              console.log('rights',this.userRights);
             // this.rights  = allRights;
              if(allUsers.body)
              {
              this.userList=allUsers.body;
              }
              console.log("usr",this.userList);
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

  editRights(id: number) {
    this.router.navigate(['/rights-update', id]);
  }
  trackId(index: number, item: IRights): number {
    return item.menuId ?? 0;
  }

  filterRights(event: any): void {
    this.RightsService.getRightsById(event).subscribe({
      next: (right) => {
        if(right.body) {
          this.rights = right.body;
        }
      }
    });
  }
  updateRights(): void {
    if (this.rights !== null && this.rights.length>0) {
      this.subscribeToSaveResponse(this.RightsService.updateRights(this.rights));
    }
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserRights[]>>): void {
    result.subscribe(
      res1 =>{ if(res1.body) {
      this.onSaveSuccess(res1.body.length)}},
      (res: HttpErrorResponse) => this.onSaveError(res.headers),
    );

  }
  protected onSaveSuccess(lngth: number) {
    // this.isSaving = false;
    this.toastr.success('Rights Assigned Successfuly');
     setTimeout(() => {
       // this.spinner.hide();
     }, 3000);
  }

  protected onSaveError(res: HttpHeaders): void {
    this.toastr.error('error', "Error during Rights assignment");

  }
  protected onCheckboxChange(event: Event, mnuname: string) {
    const input = event.target as HTMLInputElement;
    if (mnuname.toLowerCase() == "view") {
      this.rights.forEach(mnu => {
        mnu.view = input.checked;
      })
    }
    if (mnuname.toLowerCase() == "add") {
      this.rights.forEach(mnu => {
        mnu.add = input.checked;
      })
    }
    if (mnuname.toLowerCase() == "edit") {
      this.rights.forEach(mnu => {
        mnu.update = input.checked;
      })
    }
    if (mnuname.toLowerCase() == "delete") {
      this.rights.forEach(mnu => {
        mnu.deleted = input.checked;
      })
    }
    if (mnuname.toLowerCase() == "print") {
      this.rights.forEach(mnu => {
        mnu.print = input.checked;
      })
    }
    if (mnuname.toLowerCase() == "search") {
      this.rights.forEach(mnu => {
        mnu.search = input.checked;
      })
    }
    if (mnuname.toLowerCase() == "active") {
      this.rights.forEach(mnu => {
        mnu.isActive = input.checked;
      })
    }
    if (mnuname.toLowerCase() == "approval") {
      this.rights.forEach(mnu => {
        mnu.approval = input.checked;
      })
    }
  }

}
