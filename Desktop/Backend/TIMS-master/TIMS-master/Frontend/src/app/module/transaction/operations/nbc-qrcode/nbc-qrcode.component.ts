import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-nbc-qrcode',
  imports: [CommonModule,MatTooltipModule],
  templateUrl: './nbc-qrcode.component.html',
  styleUrl: './nbc-qrcode.component.scss'
})
export class NbcQrcodeComponent {



  nbcQrcode:any[]=[
     {mcode:3011611,challanNo:'23009355'
      ,destination:'HOSUR',qnt:'120',branch:'GGCO'
    }
  ];
}
