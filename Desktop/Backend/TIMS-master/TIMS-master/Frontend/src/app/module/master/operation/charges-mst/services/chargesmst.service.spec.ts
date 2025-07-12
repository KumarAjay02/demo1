import { TestBed } from '@angular/core/testing';

import { ChargesmstService } from './chargesmst.service';

describe('ChargesmstService', () => {
  let service: ChargesmstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChargesmstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
