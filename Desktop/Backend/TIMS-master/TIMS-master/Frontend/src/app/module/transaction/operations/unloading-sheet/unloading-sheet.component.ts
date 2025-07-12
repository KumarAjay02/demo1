import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unloading-sheet',
  imports: [RouterLink,CommonModule,MatTooltipModule],
  templateUrl: './unloading-sheet.component.html',
  styleUrl: './unloading-sheet.component.css'
})
export class UnloadingSheetComponent {


  unloadingsheet:any[]=[
    {drsNo:125,route:'JPR TO DHRT'
      ,VEHICLEnO:'HR47E5085',BarcodeNo:'1285616001',
    }
  ];
}
