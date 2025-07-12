import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nbcunloadingsheet',
  imports: [CommonModule,MatTooltipModule],
  templateUrl: './nbcunloadingsheet.component.html',
  styleUrl: './nbcunloadingsheet.component.scss'
})
export class NbcunloadingsheetComponent {



  nbcunloading:any[]=[

     {drsNo:125,route:'JPR TO DHRT'
      ,VEHICLEnO:'HR47E5085',BarcodeNo:'1285616001',
    }
  ];
}
