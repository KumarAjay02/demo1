import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { AwbchallanserviceService } from './service/awbchallanservice.service';
import { AwbChallanModels } from './models/awbchallanModel';

@Component({
  selector: 'app-awbchallan',
  imports: [RouterLink,CommonModule,MatTooltipModule],
  templateUrl: './awbchallan.component.html',
  styleUrl: './awbchallan.component.scss'
})
export class AwbchallanComponent implements OnInit {



  _Service=inject(AwbchallanserviceService);


  awbdatalist:AwbChallanModels[]=[];

  ngOnInit(): void {
    this._Service.getAwbData().subscribe(e=>{
      this.awbdatalist=e;
    })
  }

}
