import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { IPinCodeMaster } from './form/models/pincodemst.model';
import { PincodemstService } from './services/pincodemst.service';

@Component({
  selector: 'app-pincodemst',
  imports: [CommonModule,MatTooltipModule,RouterLink],
  templateUrl: './pincodemst.component.html',
  styleUrl: './pincodemst.component.css'
})
export class PincodemstComponent implements OnInit {

  _router=inject(Router);
  _service=inject(PincodemstService);


  pincodemst:IPinCodeMaster[]=[];


  ngOnInit(): void {
    this._service.getPincodeList().subscribe(e=>{
      this.pincodemst=e;
    })
  }
  BtnView(id:any){

    this._router.navigateByUrl('pincodemst/view/'+id);
  }

  BtnUpdate(id:any){
    this._router.navigateByUrl('pincodemst/edit/'+id);

  }



}
