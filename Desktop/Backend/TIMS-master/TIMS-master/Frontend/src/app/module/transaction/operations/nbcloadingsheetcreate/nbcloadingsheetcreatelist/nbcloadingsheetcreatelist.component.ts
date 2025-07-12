import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nbcloadingsheetcreatelist',
  imports: [CommonModule,RouterLink,MatTooltipModule],
  templateUrl: './nbcloadingsheetcreatelist.component.html',
  styleUrl: './nbcloadingsheetcreatelist.component.scss'
})
export class NbcloadingsheetcreatelistComponent {

  nbcloadingsheetlist:any[]=[
    {drsNo:125,route:'JPR TO DHRT'
      ,VEHICLEnO:'HR47E5085',BarcodeNo:'1285616001',
    }
  ];
}
