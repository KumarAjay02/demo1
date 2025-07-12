import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-drs-challan',
  imports: [CommonModule,MatTooltipModule,FormsModule],
  templateUrl: './drs-challan.component.html',
  styleUrl: './drs-challan.component.scss'
})
export class DrsChallanComponent {

 
  drsList:any[]=[
      {drsNo:125,route:'JPR TO DHRT'
      ,VEHICLEnO:'HR47E5085',BarcodeNo:'1285616001',
    }
  ];



  toggleAllSelection(event: any):void {
  const isChecked = event.target.checked;
  this.drsList.forEach(item => item.selected = isChecked);
}
}
