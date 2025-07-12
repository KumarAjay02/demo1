import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { ChargesmstService } from './services/chargesmst.service';
import { chargesMaster } from './models/chargesmst';

@Component({
  selector: 'app-charges-mst',
  imports: [RouterLink,CommonModule,ReactiveFormsModule ,MatTooltipModule],
  templateUrl: './charges-mst.component.html',
  styleUrl: './charges-mst.component.css'
})
export class ChargesMstComponent {



  service=inject(ChargesmstService);
        _router=inject(Router);
    
        chargesList:chargesMaster[]=[];
      
    
      ngOnInit(): void {
        this.service.getBranchList().subscribe(data=>{
          this.chargesList=data;
        })
    
        
      }
    
      BtnView(id:any){
    
        this._router.navigateByUrl('chargemst/view/'+id);
      }
    
    
      BtnUpdate(id:any){
        this._router.navigateByUrl('chargemst/edit/'+id);
      }
  

}
