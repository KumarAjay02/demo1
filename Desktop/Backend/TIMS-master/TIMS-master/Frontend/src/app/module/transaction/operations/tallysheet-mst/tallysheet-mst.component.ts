import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { tallysheet } from './models/tallysheet';
import { TallysheetService } from './services/tallysheet.service';

@Component({
  selector: 'app-tallysheet-mst',
  imports: [RouterLink,CommonModule,ReactiveFormsModule ,MatTooltipModule],
  templateUrl: './tallysheet-mst.component.html',
  styleUrl: './tallysheet-mst.component.css'
})
export class TallysheetMstComponent {


  
     _service=inject(TallysheetService);
        _router=inject(Router);
    
      branchList:tallysheet[]=[];
    
    
      ngOnInit(): void {
        this._service.getBranchList().subscribe(data=>{
          this.branchList=data;
        })
    
        
      }
    
      BtnView(id:any){
    
        this._router.navigateByUrl('tallysheet/view/'+id);
      }
    
    
      BtnUpdate(id:any){
        this._router.navigateByUrl('tallysheet/edit/'+id);
      }
  

}
