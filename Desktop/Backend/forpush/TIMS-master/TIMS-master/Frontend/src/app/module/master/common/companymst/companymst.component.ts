import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { CompanyMaster } from './models/companymst.model';
import { CompanymstService } from './services/companymst.service';
import { ICompany } from './models/company.model';

@Component({
  selector: 'app-companymst',
  imports: [CommonModule,RouterLink,MatTooltipModule],
  templateUrl: './companymst.component.html',
  styleUrl: './companymst.component.css'
})
export class CompanymstComponent implements OnInit{


  _route=inject(Router);
  _service=inject(CompanymstService);

  compnaymstdata: ICompany[] = [];

  ngOnInit(): void {
    this._service.getCompanyList().subscribe(e=>{
      this.compnaymstdata=e;
    })
  }

  BtnView(id:any){

    this._route.navigateByUrl('companymst/view/'+id);

  }
  BtnUpdate(id:any){

    this._route.navigateByUrl('companymst/edit/'+id);
  }
}
