import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { CompanydivisionmstService } from './services/companydivisionmst.service';
import { CompanyDivisionMaster } from './models/companydivisonmst.model';
import { IDivision } from './models/division.model';

@Component({
  selector: 'app-companydivisionmst',
  imports: [RouterLink,CommonModule,MatTooltipModule],
  templateUrl: './companydivisionmst.component.html',
  styleUrl: './companydivisionmst.component.css'
})
export class CompanydivisionmstComponent implements OnInit {


  _router=inject(Router);
  _service=inject(CompanydivisionmstService);


  compdivisionlist: IDivision[] = [];


  ngOnInit(): void {
    this._service.getDivisonList().subscribe(e=>{
      this.compdivisionlist=e;
    })
  }

  BtnView(id:any){
    this._router.navigateByUrl('companydivisionmst/view/'+id);
  }

  BtnUpdate(id:any){
    this._router.navigateByUrl('companydivisionmst/edit/'+id);
  }
}
