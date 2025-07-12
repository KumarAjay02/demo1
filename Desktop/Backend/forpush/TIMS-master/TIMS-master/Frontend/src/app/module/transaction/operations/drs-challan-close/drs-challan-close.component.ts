import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-drs-challan-close',
  imports: [CommonModule,MatTooltipModule],
  templateUrl: './drs-challan-close.component.html',
  styleUrl: './drs-challan-close.component.scss'
})
export class DrsChallanCloseComponent {

  drsList:any[]=[
     {drsNo:125,route:'JPR TO DHRT'
      ,VEHICLEnO:'HR47E5085',BarcodeNo:'1285616001',
    }
  ];
}
