import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoadingSheetCreateService } from './services/loading-sheet-create.service';
import { LoadingSheetCreate } from './models/loadingSheetCreate.model';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-loading-sheet-create',
  imports: [CommonModule,MatTooltipModule,RouterLink],
  templateUrl: './loading-sheet-create.component.html',
  styleUrl: './loading-sheet-create.component.scss'
})
export class LoadingSheetCreateComponent implements OnInit {

 _router=inject(Router);
 _service=inject(LoadingSheetCreateService);


 loadingsheet:LoadingSheetCreate[]=[];

   currentDate: string = new Date().toISOString().split('T')[0];
  ngOnInit(): void {
    
    this._service.getLoadingSheet().subscribe(e=>{ 
      this.loadingsheet=e;
    })

  }



    




}
