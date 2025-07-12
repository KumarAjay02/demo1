import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { VendorVehicleRateModel } from './model/vendorvehicleratemodel';
import { VendorvehicleratemstService } from './service/vendorvehicleratemst.service';
 

@Component({
  selector: 'app-vendorvehicleratemst',
  imports: [CommonModule,MatTooltipModule,RouterLink],
  templateUrl:'./vendorvehicleratemst.component.html',
  styleUrl: './vendorvehicleratemst.component.scss'
})
export class VendorvehicleratemstComponent implements OnInit {


  vendorratemst:VendorVehicleRateModel[]=[];

  _service=inject(VendorvehicleratemstService);

ngOnInit(): void {
  this._service.getlistrate().subscribe(e=>{
    this.vendorratemst=e;
  })
}

}
