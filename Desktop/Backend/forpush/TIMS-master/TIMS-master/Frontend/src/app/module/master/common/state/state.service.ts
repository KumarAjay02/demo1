// state.service.ts
import { Injectable } from '@angular/core';
import {  HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {IState} from './model/state.model';

@Injectable({ providedIn: 'root' })
export class StateService {
  private states: IState[] = [
  ];

  getStates(): Observable<IState[]> {
    return of(this.states);
  }

  getStateById(id: number): Observable<IState | undefined> {
    return of(this.states.find(state => state.id == id));
  }

  updateState(updatedState: IState): Observable<IState> {
    const index = this.states.findIndex(state => state.id === updatedState.id);
    if (index !== -1) {
      this.states[index] = updatedState;
    }
    return of(updatedState);
  }

  delete(id: number): Observable<HttpResponse<any>> {
    this.states = this.states.filter(state => state.id !== id);
    return of(new HttpResponse({ status: 200 }));
  }
}
