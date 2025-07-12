import {Component, HostListener, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../core/auth.service';
import { ThemeService } from '../../core/theme.service';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import {ApiService} from '../../core/api.service';
import {EmployeeViewService} from '../../shared/services/employee-view.service';
import {catchError, debounceTime, of, switchMap, tap} from 'rxjs';
import {NavBarServices} from '../../core/navbar.service';
import {IMenuItem, MenuItem} from './model/menu-item.model';
import {IEmployeeView} from '../../shared/model/employee-view.model';
import {IRights} from '../../shared/model/rights.model';
import {MatDialog} from '@angular/material/dialog';
import {CompanySelectionComponent} from '../../features/company-selection/company-selection.component';
import {AutoComplete, AutoCompleteCompleteEvent} from 'primeng/autocomplete';
import {RightsService} from '../../features/rights/rights.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    ReactiveFormsModule,
    AutoComplete
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private router = inject(Router);
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);

  isFullscreen = false;
  currentTheme: 'light' | 'dark' = 'light';
  isCollapsed = true;
  element: any;
  currentAccount: any;
  //globals: ThemeOptions | undefined=null,
  menuItems?: IMenuItem[]|[];
  allMenuItems?: IMenuItem[]|[];

  employeeView?: IEmployeeView | null;
  searchRights?:IRights[]=[];
  selectedMenu: any;

  filteredMenues: any[] | undefined;

  constructor(
    private apiService: ApiService,
    private  employeeViewService: EmployeeViewService,
    private navBarServices:NavBarServices,
    private dialog: MatDialog,
    private rightsService: RightsService,
  ) {
  }
  openCompanySelection(): void {
    // Open modal for selection
    const dialogRef = this.dialog.open(CompanySelectionComponent, {
      disableClose: false,
      width: '640px',
      panelClass: 'flat-dialog',
      height:'340px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
  ngOnInit(): void {
    this.currentTheme = this.themeService.currentTheme;
    const body = document.body;
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(`${this.currentTheme}-theme`);

    this.element = document.documentElement;

    this.authService.identity().subscribe(account => {
      this.currentAccount = account;
      if (this.currentAccount) {
        this.employeeViewService.findByCard(this.currentAccount.login).subscribe(res => {
          this.employeeView = res.body;
        });
          if(account) {
            this.navBarServices.getMenuItems(account.login).subscribe(res => {
              this.menuItems = res.body??[];
            });
            this.authService.searchOptions("%").subscribe(right => {
                if(right) {
                  this.searchRights = right;
                 this.allMenuItems=this.changeRightsToMenu(this.searchRights);
                }
            });
          }
      }
    });
  }
  changeRightsToMenu(rights:IRights[]): IMenuItem[] {
    return rights.map((item) => ({
      menuName: item.menuName,
      link: item.url,
    }));
  }
  filterMenu(event: AutoCompleteCompleteEvent) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < (this.allMenuItems as any[]).length; i++) {
      const menu = (this.allMenuItems as any[])[i];
      if (menu.menuName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(menu);
      }
    }
    this.filteredMenues = filtered;
  }
  toggleFullscreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      this.isFullscreen = true;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        this.isFullscreen = false;
      }
    }
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(this.currentTheme);

    const body = document.body;
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(`${this.currentTheme}-theme`);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get currentUser() {
    return this.authService.currentUser;
  }

  @HostListener('document:fullscreenchange')
  fullscreenChange(): void {
    this.isFullscreen = !!document.fullscreenElement;
  }
  navigateToMenu(menu: any) {
    if (menu?.value?.link) {
      this.router.navigate([menu?.value?.link]);
    }
  }
}
