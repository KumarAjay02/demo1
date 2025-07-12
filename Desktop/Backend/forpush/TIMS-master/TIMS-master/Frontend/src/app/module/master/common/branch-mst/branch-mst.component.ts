import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BranchMaster } from './models/branchmst';
import { BranchmstService } from './services/branchmst.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import {IBranch} from './models/branch.model';

@Component({
  selector: 'app-branch-mst',
  imports: [RouterLink,CommonModule,ReactiveFormsModule ,MatTooltipModule],
  templateUrl: './branch-mst.component.html',
  styleUrl: './branch-mst.component.css'
})
export class BranchMstComponent implements OnInit {

    _service=inject(BranchmstService);
    _router=inject(Router);

  branchList:IBranch[]=[];


  ngOnInit(): void {
    this._service.getBranchList().subscribe(data=>{
      this.branchList=data;
    })


  }

  BtnView(id:any){

    this._router.navigateByUrl('branchmst/view/'+id);
  }


  BtnUpdate(id:any){
    this._router.navigateByUrl('branchmst/edit/'+id);
  }
}
