import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { MinidocketmstService } from './services/minidocketmst.service';
import { minidocketmaster } from './models/minidocketmaster';

@Component({
  selector: 'app-mini-docket-mst',
  imports: [RouterLink,CommonModule,ReactiveFormsModule ,MatTooltipModule],
  templateUrl: './mini-docket-mst.component.html',
  styleUrl: './mini-docket-mst.component.css'
})
export class MiniDocketMstComponent {

  
       _service=inject(MinidocketmstService);
          _router=inject(Router);
      
        branchList:minidocketmaster[]=[];
      
      
        ngOnInit(): void {
          this._service.getBranchList().subscribe(data=>{
            this.branchList=data;
          })
      
          
        }
      
        BtnView(id:any){
      
          this._router.navigateByUrl('minidocket/view/'+id);
        }
      
      
        BtnUpdate(id:any){
          this._router.navigateByUrl('minidocket/edit/'+id);
        }

}
