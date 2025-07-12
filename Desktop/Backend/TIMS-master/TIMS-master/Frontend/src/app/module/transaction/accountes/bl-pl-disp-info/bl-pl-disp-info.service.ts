import { Injectable } from '@angular/core';
import { IBS_DISP_INFO } from './model/bl-pl-disp-info.module';
import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BLPLDispInfoService {
  private BS_DISP_INFO: IBS_DISP_INFO[] = [
    { Id: 1, GL_NATURE: 2, BS_HEAD_CODE: 'BL01', BS_HEAD_NAME: 'Capital Account', SCHEDULE_CODE: 204, GL_GROUP_CODE: 0, SRNO: 0},
    { Id: 2, GL_NATURE: 2, BS_HEAD_CODE: 'BL01', BS_HEAD_NAME: 'Capital Account', SCHEDULE_CODE: 204, GL_GROUP_CODE: 20403, SRNO: 1},
    { Id: 3, GL_NATURE: 2, BS_HEAD_CODE: 'BL01', BS_HEAD_NAME: 'Capital Account', SCHEDULE_CODE: 204, GL_GROUP_CODE: 20402, SRNO: 2},
    { Id: 4, GL_NATURE: 2, BS_HEAD_CODE: 'BL01', BS_HEAD_NAME: 'Capital Account', SCHEDULE_CODE: 204, GL_GROUP_CODE: 20401, SRNO: 3},
  ];

  getBLPLDispInfo(): Observable<IBS_DISP_INFO[]> {
    return of(this.BS_DISP_INFO);
  }

  getBLPLDispInfoById(id: number): Observable<IBS_DISP_INFO | undefined> {
    return of(this.BS_DISP_INFO.find(p => p.Id === id));
  }

  updateBLPLDispInfo(updatedCountry: IBS_DISP_INFO): Observable<IBS_DISP_INFO> {
    const index = this.BS_DISP_INFO.findIndex(p => p.Id === updatedCountry.Id);
    if (index !== -1) {
      this.BS_DISP_INFO[index] = updatedCountry;
    }
    return of(updatedCountry);
  }

  delete(id: number): Observable<HttpResponse<any>> {
    this.BS_DISP_INFO = this.BS_DISP_INFO.filter(p => p.Id !== id);
    return of(new HttpResponse({ status: 200 }));
  }
}
