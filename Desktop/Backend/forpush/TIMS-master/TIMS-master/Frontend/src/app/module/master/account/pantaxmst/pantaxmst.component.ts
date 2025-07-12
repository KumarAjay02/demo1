import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
 
import { PantaxserviceService } from './service/pantaxservice.service';
import { PantaxModels, PanTaxSpecial } from './models/pantaxmodel';

@Component({
  selector: 'app-pantaxmst',
  imports: [CommonModule,MatTooltipModule,RouterLink],
  templateUrl: './pantaxmst.component.html',
  styleUrl: './pantaxmst.component.scss'
})
export class PantaxmstComponent implements OnInit {


  _service=inject(PantaxserviceService);
  pantax:PantaxModels[]=[];
pantaxSpecial:PanTaxSpecial[]=[];
  ngOnInit(): void {
  

    this._service.gettaxSpecial().subscribe(e=>{
this.pantaxSpecial=e;
    })

      this._service.getPantext().subscribe(e=>{
      this.pantax=e;
    })
  }


}
