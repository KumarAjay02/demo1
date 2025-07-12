import { TestBed } from '@angular/core/testing';

import { StationarymstService } from './stationarymst.service';

describe('StationarymstService', () => {
  let service: StationarymstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationarymstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
