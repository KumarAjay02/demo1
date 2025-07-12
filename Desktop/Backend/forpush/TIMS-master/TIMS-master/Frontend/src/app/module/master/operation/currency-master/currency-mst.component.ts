import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { currencyModels } from './models/currencyModel';
import { CurrencyMstServicesService } from './services/currency-mst-services.service';

@Component({
  selector: 'app-currency-mst',
  imports: [CommonModule,RouterLink,MatTooltipModule],
  templateUrl: './currency-mst.component.html',
  styleUrl: './currency-mst.component.scss'
})
export class CurrencyMstComponent {
  _router=inject(Router);
  _service=inject(CurrencyMstServicesService);
  currencyMst:currencyModels[]=[];
  ngOnInit(): void {
    this._service.getAllCurrency().subscribe(e=>{
        this.currencyMst=e;
    })
  }
  BtnView(id:any){
    this._router.navigateByUrl('CurrencyMaster/view/'+id);
  }
  BtnUpdate(id:any){
    this._router.navigateByUrl('/CurrencyMaster/edit/'+id);
  }
}
