import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StationaryRecieveServicesService } from './services/stationary-recieve-services.service';
import { stationaryrecieve } from './models/stationaryrecieve';

@Component({
  selector: 'app-stationary-recieve',
  imports: [RouterLink,CommonModule,ReactiveFormsModule ,MatTooltipModule],
  templateUrl: './stationary-recieve.component.html',
  styleUrl: './stationary-recieve.component.scss'
})
export class StationaryRecieveComponent {
       _service=inject(StationaryRecieveServicesService);
          _router=inject(Router);
        stationaryList:stationaryrecieve[]=[];
        ngOnInit(): void {
          this._service.getStationryRecList().subscribe(data=>{
            this.stationaryList=data;
            console.log(this.stationaryList)
            console.log(typeof this.stationaryList)
            
          })  
        }
}
