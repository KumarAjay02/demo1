import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { ServiceModeMaster } from './models/serviceMode.model';
import { ServicemodemstService } from './services/servicemodemst.service';

@Component({
  selector: 'app-service-modemst',
  imports: [CommonModule,RouterLink,MatTooltipModule],
  templateUrl: './service-modemst.component.html',
  styleUrl: './service-modemst.component.css'
})
export class ServiceModemstComponent implements OnInit {


  _router=inject(Router);
  _service=inject(ServicemodemstService);

  serviceModeMst:ServiceModeMaster[]=[];


  ngOnInit(): void {
    this._service.getAllServiceMode().subscribe(e=>{
      this.serviceModeMst=e;
    })
  }

  BtnView(id:any){

    this._router.navigateByUrl('serviceModemst/view/'+id);
  }
  BtnUpdate(id:any){
    this._router.navigateByUrl('serviceModemst/edit/'+id);
  }
}
