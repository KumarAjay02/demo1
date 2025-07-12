// country-list.component.ts
import { Component, DebugElement, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute,    Router, RouterModule,   } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CountryService } from './country.service';
import { ICountry } from './model/country.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CountryDeleteDialogComponent } from './country-delete-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoadingserviceService } from '../../../../shared/loading/loadingservice.service';
 

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent implements OnInit {
  countries: ICountry[] = [];
  private toastr = inject(ToastrService);
 

  constructor(
     private route: ActivatedRoute,
    private countryService: CountryService,
    private _router: Router,
    private dialog: MatDialog,
    private _loading:LoadingserviceService,

 
  ) {}

  ngOnInit() {
  this.loadCountries();
  }


  
   


  // list show 
  loadCountries() {
    this._loading.show();
    this.countryService.getCountryList().subscribe({
      next: res => {
      if (res.status) {
        this.countries = res.data;
      } else {
        this.toastr.error('api load error '+res.message);
      }
       this._loading.hide();
    },
    error: err => {
      // Show only the message from the API response
      const messageFromApi = err.error?.message;
      if (messageFromApi) {
       this.toastr.error('Error api List bind '+messageFromApi);
      }
      this._loading.hide();
    }
  }
);

}



ViewCountry(id: any): void {
  this._router.navigateByUrl(`/country-master/view/${id}`);
}

 
CreateCountry(){
this._router.navigateByUrl('/country-master/new');
}
 

Update(id: any): void {
  this._router.navigateByUrl(`/country-master/edit/${id}`);
}

  trackById(index: number, item: ICountry): any {
    return item.serialNo ?? [];
  }

  delete(id:any): void {
    
    const dialogRef = this.dialog.open(CountryDeleteDialogComponent, {
      data: {id}
      
    });

    dialogRef.afterClosed().subscribe(result => {
 
      if(result===false){
            this.toastr.info('Deletion cancelled.', 'Info');
            return;
      }
        debugger;
      if(result.status) {
        this.toastr.success('Message '+result.message,'Success');
        this.loadCountries();
      } 
      else{
        this.toastr.error(' Error '+result.message,'Error');
    
      }
        
    
       
    });
  }

  

}