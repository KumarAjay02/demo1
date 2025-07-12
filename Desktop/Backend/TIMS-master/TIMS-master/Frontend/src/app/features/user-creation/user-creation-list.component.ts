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

import { IUser, IUserSearch, UserSearch } from './model/user-creation.model';
import { UserCreationService } from './user-creation.service';
import { IUserRights } from '../menu-access-master/user-rights.model';
import { IvMaster } from '../menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../menu-access-master/menu-access-master.service';

@Component({
  selector: 'app-user-creation-list',
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
  templateUrl: './user-creation-list.component.html'
})
export class UserCreationListComponent implements OnInit {
  users: IUser[] = [];
  filteredUsers: IUser[] = [];
  pagedUsers: IUser[] = [];
  searchParams: IUserSearch = new UserSearch();
  userRights?: IUserRights;
  private toastr = inject(ToastrService);

  constructor(
    private userService: UserCreationService,
    private router: Router,
    private dialog: MatDialog,
    private menuAccessService: MenuAccessMasterService
  ) {}

  ngOnInit(): void {
    this.checkUserRights();
    this.loadAll();

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

  loadAll(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      // this.filteredUsers = [...users];
    });
  }

  search(): void {
    this.userService.searchUsers(this.searchParams).subscribe(users => {
      this.users = users;
    });

  }

  trackId(index: number, item: IUser): number {
    return item.id ?? 0;
  }
  exportAsExcel() {
    // this.spinner.show();
    // this.citySearch.fileType="xlsx"
    // this.CityService.downloadList(this.citySearch).subscribe(
    //   res => {
    //     saveAs(res, 'City.xlsx');
    //     // this.spinner.hide();
    //   },
    //   () => {
    //     // this.spinner.hide();
    //   },
    // );
  }

  exportAsPdf() {
    // this.searchParams.fileType="pdf"
    // this.userService.downloadList(this.searchParams).subscribe(
    //   res => {
    //     saveAs(res, 'City.pdf');
    //   },
    //   () => {
    //     // this.spinner.hide();
    //   },
    // );
  }
  page = 1;
  pageSize = 5;
  pageSizeOptions = [5, 10, 20, 50, 100];

  get totalPages(): number {
    return Math.ceil(this.users.length / this.pageSize);
  }

  paginatedUsers(): any[] {
    const start = (this.page - 1) * this.pageSize;
    return this.users.slice(start, start+this.pageSize);
  }

  setPage(pageNumber: number): void {
    if (pageNumber < 1 || pageNumber > this.totalPages) return;
    this.page = pageNumber;
  }

  protected readonly Math = Math;
}
