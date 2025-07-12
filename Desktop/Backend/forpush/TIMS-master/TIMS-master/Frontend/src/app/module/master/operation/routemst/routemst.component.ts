import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { RouteMaster } from './model/routemst.model';
import { RoutemstService } from './services/routemst.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { IvMaster } from '../../../../features/menu-access-master/iv-master.model';
import { MenuAccessMasterService } from '../../../../features/menu-access-master/menu-access-master.service';
import { IUserRights } from '../../../../features/menu-access-master/user-rights.model';
import { LoadingserviceService } from '../../../../shared/loading/loadingservice.service';
 
 

@Component({
  selector: 'app-routemst',
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './routemst.component.html',
  styleUrl: './routemst.component.css'
})
export class RoutemstComponent implements OnInit {




  _route = inject(Router);
  _service = inject(RoutemstService);
  _toaster = inject(ToastrService);
  _loading = inject(LoadingserviceService);
  _userRightsService=inject(MenuAccessMasterService);

  userRights:IUserRights;
  routeMaster: RouteMaster[] = [];


  ngOnInit(): void {


    this.RouteList();
        const accessCheck = new IvMaster();
        accessCheck.code = this._route.url;
        this.UserAccess(accessCheck);

  }



  UserAccess(access:any){

    debugger
    this._userRightsService.validate(access).subscribe({
      next:res=>{
        if(res.body !=null){
          this._toaster.error('User not authorize','Error');
        }else{
          forkJoin({
            right:this._userRightsService.getAuthentications(access),
            routemst:this._service.GetRouteList()
          }).subscribe({
            next:({right,routemst})=>{

              console.log('right'+right.body)
              console.log('route'+routemst)
              if(right.body){
                this.userRights=right.body;
              }
              if(routemst){
                
              }
            },error:err=>{
              this._toaster.error('Error api '+err.message);
            }
          })
        }
      },error:err=>{
        this._toaster.error('Error faild api'+err.message);
      }
    })
  }

  RouteList(): void {

    this._loading.show();
    this._service.GetRouteList().subscribe({
      next: res => {
        if (res.status) {
          this.routeMaster = res.data;
         
        } else {
          this._toaster.warning('no data ' + res.message, 'Warning');
        }

        this._loading.hide();
      }, error: err => {

        this._toaster.error('Error get list ' + err.message, 'Error');
        this._loading.hide();
      }
    })

  }

 
Create():void{
  this._route.navigateByUrl('routemst/add');
}
  BtnView(id: any) {

    this._route.navigateByUrl('routemst/view/' + id);
  }

  BtnUpdate(id: any) {

    this._route.navigateByUrl('routemst/edit/' + id);
  }

  Delete(id:any){
    const comform =confirm('Sure Want to Delete !');

    if(comform){
    this._service.Delete(id).subscribe({
      next:res=>{
        if(res.status){
          this._toaster.success(res.message,'Success');
          this.RouteList();
        }else{
      this._toaster.warning(res.message,'Warning');
        }
      },error:err=>{
          this._toaster.error('Error Delete '+err.message,'Error');
        }
    })
    }else{
      this._toaster.info('Cancle to delete','Info');
    }
   


  }
}
