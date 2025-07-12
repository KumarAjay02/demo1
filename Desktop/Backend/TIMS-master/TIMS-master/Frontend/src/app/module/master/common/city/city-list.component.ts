import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';

import { ICity } from './model/city.model';
import { CityService } from './city.service';
import {CommonModule} from '@angular/common';
 
import { CityDeleteDialogComponent } from './city-delete-dialog.component';
 
import { forkJoin } from 'rxjs';
import { ICitySearch, CitySearch } from './model/city-search.model';
import {FormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { IvMaster } from '../../../../features/menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../../../../features/menu-access-master/menu-access-master.service';
import { IUserRights } from '../../../../features/menu-access-master/user-rights.model';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
    FontAwesomeModule,
    MatTooltipModule
  ],
})
export class CityListComponent implements OnInit{
  cities: ICity[] = [];
  userRights?: IUserRights;
  citySearch: ICitySearch;
  private toastr = inject(ToastrService);
  constructor(
    private CityService: CityService,
    private router: Router,
    protected menuAccessMasterService: MenuAccessMasterService,
    private dialog: MatDialog
  ) {
    this.citySearch = new CitySearch();
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
            cities: this.CityService.getcityList()
          }).subscribe({
            next: ({ rights, cities }) => {
              if(rights.body) {
                this.userRights = rights.body;
              }
              if(cities) {
                this.cities = cities;
              }
            },
            error: () => this.handleUnauthorized()
          });
        }
      },
      error: () => this.handleUnauthorized()
    });
  }

  loadAll() {
    this.CityService.getcityList().subscribe(city => {if(city) {this.cities = city}});
    }
  handleUnauthorized() {
    this.toastr.error('You are not authorized to access this page');
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 2000);
  }
  search() {
    this.CityService.citySearch(this.citySearch).subscribe(city => {
      console.log(city);
      if(city) {
        this.cities = city

      }

    });
  }
  trackId(index: number, item: ICity): number {
    return item.id ?? 0;
  }

  delete(city: ICity): void {
    const dialogRef = this.dialog.open(CityDeleteDialogComponent, {
      data: { city }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAll();
      }
    });
  }
  exportAsExcel() {
    // this.spinner.show();
    this.citySearch.fileType="xlsx"
    this.CityService.downloadList(this.citySearch).subscribe(
      res => {
         saveAs(res, 'City.xlsx');
        // this.spinner.hide();
      },
      () => {
        // this.spinner.hide();
      },
    );
  }

  exportAsPdf() {
    this.citySearch.fileType="pdf"
    this.CityService.downloadList(this.citySearch).subscribe(
      res => {
        saveAs(res, 'City.pdf');
      },
      () => {
        // this.spinner.hide();
      },
    );
  }
  page = 1;
  pageSize = 8;
  pageSizeOptions = [5, 10, 20, 50, 100];
  get totalPages(): number {
    return Math.ceil(this.cities.length / this.pageSize);
  }

  paginatedCities(): any[] {
    const start = (this.page - 1) * this.pageSize;
    return this.cities.slice(start, start+this.pageSize);
  }

  setPage(pageNumber: number): void {
    if (pageNumber < 1 || pageNumber > this.totalPages) return;
    this.page = pageNumber;
  }

  protected readonly Math = Math;
}
