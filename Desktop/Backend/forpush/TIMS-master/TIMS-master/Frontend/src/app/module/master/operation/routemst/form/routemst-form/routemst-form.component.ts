import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';

import { RouteMaster } from '../../model/routemst.model';
import { RoutemstService } from '../../services/routemst.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingserviceService } from '../../../../../../shared/loading/loadingservice.service';
 


@Component({
  selector: 'app-routemst-form',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './routemst-form.component.html',
  styleUrl: './routemst-form.component.css'
})
export class RoutemstFormComponent implements OnInit {

  editForm: FormGroup;
  isViewMode: boolean = false;
  activeId: any;
  isBtnMode: boolean = true;
  isEdit: boolean;
  isAdd: boolean;
  isLogin: any = 'rahul';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private routeService: RoutemstService,
    private _toaster: ToastrService,
    private _isLoading: LoadingserviceService,
  ) {


    this.editForm = this.fb.group({
      coCode: ['', Validators.required],
      divCode: ['', Validators.required],
      routeNo: ['', Validators.required],
      routeName: ['', Validators.required],
      routeType: ['', Validators.required],
      originHub: ['', Validators.required],
      destHub: ['', Validators.required],
      activeStatus: ['', Validators.required],
      positionVehicle: [''],
      totalKm: [0.0],
      totalTt: [0],
      viaLoc: [''],
      srNo: [0],
      createdBy: [],

      modifiedBy: [],


    });


  }

  ngOnInit(): void {
    this.activeId = this.activeRoute.snapshot.params['id'];
    this.isViewMode = this.router.url.includes('view');
    this.isAdd = this.router.url.includes('add');
    this.isEdit = this.router.url.includes('edit');
    if (this.activeId) {
      this.loadRoute(this.activeId);
    }


  }

  loadRoute(id: any) {


    this._isLoading.show();
    this.routeService.GetSingleRoute(id).subscribe({
      next: res => {
        if (res.status) {

          this.editForm.patchValue(res.data)
          if (this.isViewMode) {

            this.editForm.disable();
            this.isBtnMode = false;
          } else {
            this.editForm.enable()
            this.editForm.get('coCode').disable();
            this.editForm.get('divCode').disable();
            this.editForm.get('routeNo').disable();
            this.isBtnMode = true;
          }

        } else {
          this._toaster.warning('Api has erro ' + res.message);
          this.router.navigateByUrl('routemst');
        }
        this._isLoading.hide();
      }, error: err => {
        this._toaster.error('Error single route ' + err.message, 'Error');
        this.router.navigateByUrl('routemst');
        this._isLoading.hide();

      }
    })

    if (this.isViewMode) {

    }
  }


  RouteUpdateCreate() {
    this._isLoading.show();

    if (this.editForm.invalid) {
      this._toaster.warning('Input fiedl is required', 'Warning');
      return;

    }
    if (this.isAdd) {

      // create now route
      this.editForm.get('createdBy').setValue(this.isLogin);
          var addData = this.editForm.getRawValue();
      this.Create(addData);
        
    } else if(this.isEdit) {
      //modify the current route
      this.editForm.get('modifiedBy').setValue(this.isLogin);
          var modifyData = this.editForm.getRawValue();
   
      this.Update(modifyData);
    }else{
      console.log('No parameter valid route');
    }

    this._isLoading.hide();
  }

  Create(formData: RouteMaster) {

    this.routeService.CreateRoute(formData).subscribe({
      next: res => {
        if (res.status) {
          this._toaster.success(res.message, 'Success');
          this.router.navigateByUrl('routemst');

        } else {
          this._toaster.warning(res.message, 'Warning');
        }
      }, error: err => {

        this._toaster.error('Error create route ' + err.message);

      }
    })


  }


  Update(fromData:RouteMaster){

    this.routeService.update(this.activeId,fromData).subscribe({
      next:res=>{

        if(res.status){
          this._toaster.success(res.message,'Success');
          this.router.navigateByUrl('routemst');
        }else{

          this._toaster.warning(res.message,'Warning');
        }
      },error:err=>{
        this._toaster.error('Error api '+err.message,'Error');
      }
    })
  }

}
