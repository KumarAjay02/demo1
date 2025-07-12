import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { CardRateMaster } from './models/cardRate.model';
import { CardrateserviceService } from './services/cardrateservice.service';

@Component({
  selector: 'app-card-ratemst',
  imports: [CommonModule,RouterLink,MatTooltipModule],
  templateUrl: './card-ratemst.component.html',
  styleUrl: './card-ratemst.component.css'
})
export class CardRatemstComponent implements OnInit{



  _route=inject(Router);
  _service=inject(CardrateserviceService);
  cardRate:CardRateMaster[]=[];


  ngOnInit(): void {
    this._service.getAllCardList().subscribe(e=>{
      this.cardRate=e;
    })
  }

  BtnView(id:any){
this._route.navigateByUrl('cardratemst/view/'+id);
}

BtnUpdate(id:any){
    this._route.navigateByUrl('cardratemst/edit/'+id);

  }

}
