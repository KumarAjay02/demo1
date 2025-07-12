import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { FinancialyearopeaningService } from '../../service/financialyearopeaning.service';
import { FinancialYearModel } from '../../models/financialyearopening.model';

@Component({
  selector: 'app-financialyearopeninglist',
  imports: [CommonModule,MatTooltipModule,RouterLink],
  templateUrl: './financialyearopeninglist.component.html',
  styleUrl: './financialyearopeninglist.component.scss'
})
export class FinancialyearopeninglistComponent implements OnInit {


private _Service=inject(FinancialyearopeaningService)
  financialyear:FinancialYearModel[]=[];


  ngOnInit(): void {
    this._Service.getYear().subscribe(e=>{
      this.financialyear=e
    })
  }
  

}
