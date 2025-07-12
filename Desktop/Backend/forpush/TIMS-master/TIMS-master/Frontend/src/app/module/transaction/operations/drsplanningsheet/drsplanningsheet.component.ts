import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-drsplanningsheet',
  imports: [CommonModule,MatTooltipModule],
  templateUrl: './drsplanningsheet.component.html',
  styleUrl: './drsplanningsheet.component.scss'
})
export class DrsplanningsheetComponent {




    currentDate: string = new Date().toISOString().split('T')[0];

    draplanningsheet:any[]=[
       {loadingsheet:125,route:'JPR TO DHRT'
      ,VEHICLEnO:'HR47E5085',VEHICLEtYPE:'24FEET',barcodeNo:'1582254001',
    }
    ];
}
