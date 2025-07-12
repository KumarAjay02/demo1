import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { VehicleRateMaster } from './models/vehicleratemst.model';
import { VehicleratemstService } from './services/vehicleratemst.service';

@Component({
  selector: 'app-vehicleratemst',
  imports: [CommonModule,RouterLink,MatTooltipModule],
  templateUrl: './vehicleratemst.component.html',
  styleUrl: './vehicleratemst.component.css'
})
export class VehicleratemstComponent implements OnInit {

_route=inject(Router);
_service=inject(VehicleratemstService);
  vehicleRatemst:VehicleRateMaster[]=[];

 ngOnInit(): void {
   this._service.getVehicleList().subscribe(e=>{
    this.vehicleRatemst=e;
   })
 }

  BtnView(id:any){

    this._route.navigateByUrl('vendvehicleratemstForm/view/'+id);
  }
  
  BtnUpdate(id:any){
    this._route.navigateByUrl('vendvehicleratemstForm/edit/'+id);

  }
}
