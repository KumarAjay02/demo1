import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { HopodreceivedserviceService } from './service/hopodreceivedservice.service';
import { HoPodReceive } from './models/hopodreceived.Model';

@Component({
  selector: 'app-hopodreceived',
  imports: [CommonModule,RouterLink,MatTooltipModule],
  templateUrl: './hopodreceived.component.html',
  styleUrl: './hopodreceived.component.scss'
})
export class HopodreceivedComponent implements OnInit{


  _service=inject(HopodreceivedserviceService);
  _route=inject(Router);


  hopodlistdata:HoPodReceive[]=[];

  ngOnInit(): void {
    
    this._service.getAllList().subscribe(e=>{
      this.hopodlistdata=e;
    })
  }


  update(id:any):void{

    this._route.navigateByUrl('hopodReceived/edit/'+id);
  }

  Edit(id:any):void{
    debugger;
    this._route.navigateByUrl('hopodReceived/view/'+id);
  }
}
