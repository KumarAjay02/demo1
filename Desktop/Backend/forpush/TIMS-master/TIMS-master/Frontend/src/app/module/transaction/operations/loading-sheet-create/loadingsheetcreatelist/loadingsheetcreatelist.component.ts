import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoadingSheetCreate } from '../models/loadingSheetCreate.model';
import { LoadingSheetCreateService } from '../services/loading-sheet-create.service';
 
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-loadingsheetcreatelist',
  imports: [CommonModule,RouterLink,MatTooltipModule],
  templateUrl: './loadingsheetcreatelist.component.html',
  styleUrl: './loadingsheetcreatelist.component.scss'
})
export class LoadingsheetcreatelistComponent implements OnInit {


  loadingsheetlist:LoadingSheetCreate[]=[];

  _service=inject(LoadingSheetCreateService)

ngOnInit(): void {
  this._service.getLoadingSheet().subscribe(e=>{
    this.loadingsheetlist=e;
  })
}
}
