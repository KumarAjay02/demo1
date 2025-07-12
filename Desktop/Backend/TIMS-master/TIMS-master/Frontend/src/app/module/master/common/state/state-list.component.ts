// state-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StateService } from './state.service';
import { IState } from './model/state.model';
import { StateDeleteDialogComponent } from './state-master-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog'
import { inject } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-state-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
    FontAwesomeModule,
    MatTooltipModule,
  ],

  templateUrl: './state-list.component.html',
  styleUrls: ['./state-update.component.scss']
})
export class StateListComponent implements OnInit {
  states: IState[] = [];
  private toastr = inject(ToastrService);
  constructor(
    private stateService: StateService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadStates();
   // this.toastr.info("Success");
  }

  loadStates() {
    this.stateService.getStates().subscribe(data => {
      this.states = data;
    });
  }

  trackById(index: number, item: IState): number {
    return item.id ?? 0;
  }

  delete(state: IState): void {
    const dialogRef = this.dialog.open(StateDeleteDialogComponent, {
      data: { state }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Refresh your data or update UI
        this.loadStates();
      }
    });
  }
}
