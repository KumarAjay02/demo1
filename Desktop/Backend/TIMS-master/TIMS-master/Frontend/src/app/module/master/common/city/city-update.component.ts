// city-update.component.ts
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CityService } from './city.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ICity } from './model/city.model';
import {Checkbox} from 'primeng/checkbox';
import {AutoComplete, AutoCompleteCompleteEvent} from 'primeng/autocomplete';
import {MasterFilterService} from '../../../../shared/services/master-filter.service';
import {IPinCodeMaster} from '../pincodemst/form/models/pincodemst.model';
import {ICountry} from '../country/model/country.model';
import {IState} from '../state/model/state.model';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-city-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, FormsModule, AutoComplete],
  templateUrl: './city-update.component.html',
})
export class CityUpdateComponent implements OnInit {
  editForm: FormGroup;
  isEditMode = false;
  isViewMode = false;
  saving = false;
  cities:ICity[]=[];
  selectedCities:ICity[]=[];
  pinCodes?: IPinCodeMaster[]=[];
  countries?: ICountry[]=[];
  states?: IState[]=[];
  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    private route: ActivatedRoute,
    private router: Router,
    private masterFilterService: MasterFilterService,
    private toastr: ToastrService,
  ) {
    this.editForm = this.fb.group({
      id: [],
      serialNo:[],
      cityCode: ['', Validators.required],
      cityName: ['', Validators.required],
      stateCode:[],
      pinCode: [''],
      stdCode: [''],
      category: [''],
      zone: [''],
      countryCode: [''],
      isActive: ['Y'],
      createdBy:[''],
      createdOn: [],
      modifiedBy:[''],
      modifiedOn: [],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const mode = this.route.snapshot.url[1]?.path;

    this.isEditMode = mode === 'edit' || !id;
    this.isViewMode = mode === 'view';

    if (id) {
      this.cityService.getCityById(+id).subscribe(city => {
        if (city) {
          // Patch values to form; convert isActive string to boolean for checkbox
          this.editForm.patchValue({
            ...city,
            isActive: city.isActive === 'Y',
            countryCode: city.countryCode ? { countryCode: city.countryCode, countryName: city.countryName } : null,
            stateCode: city.stateCode ? { stateCode: city.stateCode, stateName: city.stateName } : null,
            pinCode: city.pinCode ? { pinCode: city.pinCode } : null,
          });
          if (this.isViewMode) {
            this.editForm.disable();
          }
        }
      });
    }
  }

  updateCity() {
    if (this.editForm.valid) {
      const formValue = this.editForm.value;

      const isUpdate = formValue.id;
      const action = isUpdate ? 'update' : 'create';

      // Confirm with the user before proceeding
      const confirmMsg = `Are you sure you want to ${action} this city?`;
      if (!window.confirm(confirmMsg)) {
        return; // Cancel the operation
      }

      this.saving = true;
      formValue.cityCode = formValue.cityCode?.toUpperCase();
      formValue.cityName = formValue.cityName?.toUpperCase();
      formValue.category = formValue.category?.toUpperCase();
      formValue.zone = formValue.zone?.toUpperCase();

      const cityToSave = {
        ...formValue,
        countryCode: formValue.countryCode?.countryCode ?? '',
        stateCode: formValue.stateCode?.stateCode ?? '',
        pinCode: formValue.pinCode?.pinCode ?? null,
        isActive: formValue.isActive ? 'Y' : 'N'
      };

      if (!isUpdate) {
        delete cityToSave.id;
        delete cityToSave.serialNo;
      }

      const request = isUpdate
        ? this.cityService.update(cityToSave, formValue.id)
        : this.cityService.create(cityToSave);

      request.subscribe({
        next: () => {
          this.toastr.success(`City ${isUpdate ? 'updated' : 'created'} successfully`);
          this.saving = false;
          this.router.navigate(['/city-master']);
        },
        error: () => {
          this.toastr.error(`Error ${isUpdate ? 'updating' : 'creating'} City`);
          this.saving = false;
        },
      });
    }
  }


  previousState(): void {
    window.history.back();
  }

  searchPinCode(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    this.masterFilterService.pinCodeFilter(query).subscribe(results => {
      this.pinCodes = results.body ?? [];
    });
  }

  searchCountry(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    this.masterFilterService.countryFilter(query).subscribe(results => {
      this.countries = results.body ?? [];
    });
  }

  searchState(event: AutoCompleteCompleteEvent) {
    const selectedCountry = this.editForm.get('countryCode')?.value;
    if (selectedCountry?.countryCode) {
      const query = event.query;
      this.masterFilterService.stateFilter(selectedCountry.countryCode, query).subscribe(results => {
        this.states = results.body ?? [];
      });
    }
  }


}
