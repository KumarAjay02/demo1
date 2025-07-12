import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IBS_DISP_INFO } from './model/bl-pl-disp-info.module';
import { BLPLDispInfoService } from './bl-pl-disp-info.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-bl-pl-disp-info-list',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
    FontAwesomeModule,
    MatTooltipModule
  ],
  templateUrl: './bl-pl-disp-info-list.component.html'
})
export class BLPLDispInfoListComponent implements OnInit {
  bsplDispInfos: IBS_DISP_INFO[] = [];
  private toastr = inject(ToastrService);


  constructor(
    private bsplDispInfoSearch: BLPLDispInfoService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.bsplDispInfoSearch.getBLPLDispInfo().subscribe(p => {
      if (p) {
        this.bsplDispInfos = p;
      }
    });
  }

  trackById(index: number, item: IBS_DISP_INFO): number {
    return item.Id ?? 0;
  }
}
