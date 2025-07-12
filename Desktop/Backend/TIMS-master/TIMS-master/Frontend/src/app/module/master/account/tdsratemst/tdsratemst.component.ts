import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tdsratemst',
  imports: [CommonModule,MatTooltipModule,RouterLink],
  templateUrl: './tdsratemst.component.html',
  styleUrl: './tdsratemst.component.scss'
})
export class TdsratemstComponent {


  tdsratemst:any[]=[];


  BtnView(id:any):void{

  }

  BtnUpdate(id:any):void{
    
  }
}
