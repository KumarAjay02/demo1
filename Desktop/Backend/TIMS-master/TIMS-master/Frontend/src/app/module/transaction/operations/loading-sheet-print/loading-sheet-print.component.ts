import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-loading-sheet-print',
  imports: [CommonModule,MatTooltipModule],
  templateUrl: './loading-sheet-print.component.html',
  styleUrl: './loading-sheet-print.component.scss'
})
export class LoadingSheetPrintComponent {


  
    
 
  loadingsheetprint:any[]=[
    {loadingsheet:125,route:'JPR TO DHRT'
      ,VEHICLEnO:'HR47E5085',VEHICLEtYPE:'24FEET',VEHICLEsIZE:'9000',Entryby:'rajesh',
    }
  ];

  today:any = new Date();
  currentdate = this.today.toISOString().split('T')[0];

  constructor(){
    console.log(this.currentdate)
  }

}
