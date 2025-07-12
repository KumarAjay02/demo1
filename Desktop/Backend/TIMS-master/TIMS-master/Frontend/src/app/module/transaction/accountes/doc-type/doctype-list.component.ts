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
 
import { IDocType } from './model/doctype.module';
import { DoctypeDeleteDialogComponent } from './doctype-delete-dialog.component';
import { DocTypeSearch, IDocTypeSearch } from './model/doctype-search.module';
import { DoctypeService } from './doctype.service';
import { IvMaster } from '../../../../features/menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../../../../features/menu-access-master/menu-access-master.service';
import { IUserRights } from '../../../../features/menu-access-master/user-rights.model';

@Component({
  selector: 'app-doctype-list',
  templateUrl: './doctype-list.component.html',
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
export class DoctypeListComponent implements OnInit {

  doctypes: IDocType[] = [];
  userRights?: IUserRights;
  doctypeSearch: IDocTypeSearch;
  private toastr = inject(ToastrService);

  constructor(
    private doctypeService: DoctypeService,
    private router: Router,
    protected menuAccessMasterService: MenuAccessMasterService,
    private dialog: MatDialog
  ) 
  { 
    this.doctypeSearch = new DocTypeSearch();
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
            DocType: this.doctypeService.getDocType()
          }).subscribe({
            next: ({ rights, DocType }) => {
              if (rights.body) {
                this.userRights = rights.body;
                console.log(this.userRights);
              }
              if (DocType) {
                this.doctypes = DocType;
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
    this.doctypeService.getDocType().subscribe(b => { if (b) { this.doctypes = b } });
  }

  searchDocType() {
    this.doctypeService.search(this.doctypeSearch).subscribe(d => { if (d) { this.doctypes = d } });
  }

  trackId(index: number, item: IDocType): number {
    return item.Serial_No ?? 0;
  }

  delete(doctype: IDocType): void {
    const dialogRef = this.dialog.open(DoctypeDeleteDialogComponent, {
      data: { doctype }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAll();
      }
    });
  }
}
