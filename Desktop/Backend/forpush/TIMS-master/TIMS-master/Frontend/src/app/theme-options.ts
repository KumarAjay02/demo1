import { Injectable } from '@angular/core';
import { IEmployeeView } from '../app/shared/model/employee-view.model';
import { IMaster } from './shared/model/master.modal';

@Injectable()
export class ThemeOptions {
  employeeView?: IEmployeeView | null;
  masterSearch?: IMaster | null;
}
