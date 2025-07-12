import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { Master } from '../../shared/model/master.modal';
import {ApplicationConfigService} from '../../core/config/application-config.service';


@Injectable({ providedIn: 'root' })
export class MenuMasterService {
  // public resourceUrl = this.applicationConfigService.getEndpointFor('api/menu-masters');
  // public resourceUrlAccess = this.applicationConfigService.getEndpointFor('api/menu-access-masters-authority');
  // public resourceUrlQlik = this.applicationConfigService.getEndpointFor('api/menu-masters-qlik');
  // public resourceUrlTree = this.applicationConfigService.getEndpointFor('api/menu-access-masters-tree');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

}
