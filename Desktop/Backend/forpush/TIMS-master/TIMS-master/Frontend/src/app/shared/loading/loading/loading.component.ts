import { CommonModule } from '@angular/common';
import { Component, computed, Input, Signal } from '@angular/core';
import { LoadingserviceService } from '../loadingservice.service';

@Component({
  selector: 'app-loading',
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {

  constructor(private _loadingservice:LoadingserviceService){}
 
 isLoading=computed(()=>this._loadingservice.loading());
   
  
}
