import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PackingMaster } from './models/packingmst.model';
import { PackingmstService } from './services/packingmst.service';
 
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { IvMaster } from '../../../../features/menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../../../../features/menu-access-master/menu-access-master.service';
import { IUserRights } from '../../../../features/menu-access-master/user-rights.model';

@Component({
  selector: 'app-packing-mst',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, RouterLink, FormsModule],
  templateUrl: './packing-mst.component.html',
  styleUrls: ['./packing-mst.component.css']
})
export class PackingMstComponent implements OnInit {

  private router = inject(Router);
  private _service = inject(PackingmstService);
  private toastr = inject(ToastrService);
  private menuAccessMasterService = inject(MenuAccessMasterService);

  packingmst: PackingMaster[] = [];
  filteredPackingmst: PackingMaster[] = [];
  private originalPackingmst: PackingMaster[] = [];

  userRights?: IUserRights;

  searchCode: string = '';
  searchDescription: string = '';

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
            packingmst: this._service.getListpckmst()
          }).subscribe({
            next: ({ rights, packingmst }) => {
              if (rights.body) {
                this.userRights = rights.body;
              }
              if (packingmst) {
                this.packingmst = packingmst;
                this.originalPackingmst = [...packingmst]; // for filtering
                this.filteredPackingmst = [...packingmst]; // for filtered view
              }
            },
            error: () => this.handleUnauthorized()
          });
        }
      },
      error: () => this.handleUnauthorized()
    });
  }

  loadAll(): void {
    this._service.getListpckmst().subscribe({
      next: (data) => {
        this.packingmst = data;
        this.originalPackingmst = [...data];
        this.filteredPackingmst = [...data];
      },
      error: (err) => {
        this.toastr.error('Failed to load packing list');
        console.error(err);
      }
    });
  }

  search(): void {
    this.filteredPackingmst = this.originalPackingmst.filter(item =>
      (!this.searchCode || item.code?.toLowerCase().includes(this.searchCode.toLowerCase())) &&
      (!this.searchDescription || item.description?.toLowerCase().includes(this.searchDescription.toLowerCase()))
    );
  }

  handleUnauthorized(): void {
    this.toastr.error('You are not authorized to access this page');
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 2000);
  }

  BtnView(code: string): void {
    this.router.navigateByUrl('packingmst/view/' + code);
  }

  BtnUpdate(code: string): void {
    this.router.navigateByUrl('packingmst/edit/' + code);
  }

  BtnDelete(code: string): void {
    if (!code) return;

    if (confirm(`Are you sure you want to delete code: ${code}?`)) {
      this._service.Delete(code).subscribe({
        next: () => {
          this.toastr.success(`Packing deleted successfully`);
          this.loadAll(); // reload list
        },
        error: () => {
          this.toastr.error(`Error deleting Packing`);
        }
      });
    }
  }
}
