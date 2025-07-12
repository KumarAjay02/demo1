import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { MaterialMaster } from './models/materialmst.model';
import { MaterialmstServiceService } from './services/materialmst-service.service';
 

@Component({
  selector: 'app-material-master',
  imports: [RouterLink,CommonModule,MatTooltipModule],
  templateUrl: './material-master.component.html',
  styleUrl: './material-master.component.css'
})
export class MaterialMasterComponent {

   
   

  _router=inject(Router);
  _service=inject(MaterialmstServiceService);
      
     materilamst:MaterialMaster[]=[];
  
      ngOnInit(): void {
    
        this._service.getListmaterial().subscribe(e=>{
          this.materilamst=e;
        })
        
      }
      
    BtnView(id:any):void{
      this._router.navigateByUrl('materialmst/view/'+id);
    }
    BtnUpdate(id:any):void{
      this._router.navigateByUrl('materialmst/edit/'+id);
    }
}
