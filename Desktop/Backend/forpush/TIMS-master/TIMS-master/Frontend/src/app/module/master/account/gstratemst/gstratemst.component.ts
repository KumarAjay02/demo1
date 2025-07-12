import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GstrateMaster } from './model/gstratemst.model';
import { Router, RouterLink } from '@angular/router';
import { GstratemstService } from './service/gstratemst.service';
import { routes } from '../../../../app.routes';

@Component({
  selector: 'app-gstratemst',
  imports: [CommonModule,MatTooltipModule,RouterLink],
  templateUrl: './gstratemst.component.html',
  styleUrl: './gstratemst.component.scss'
})
export class GstratemstComponent implements OnInit {


  gstratemst:GstrateMaster[]=[];

  _service=inject(GstratemstService);
  _route=inject(Router);

 ngOnInit(): void {
   this._service.getgstrate().subscribe(e=>{
    this.gstratemst=e;
   })
 }

  BtnView(id:any){

    this._route.navigateByUrl('gstratemst/view/'+id);

  }

  BtnUpdate(id:any){
this._route.navigateByUrl('gstratemst/edit/'+id);
  }
}
