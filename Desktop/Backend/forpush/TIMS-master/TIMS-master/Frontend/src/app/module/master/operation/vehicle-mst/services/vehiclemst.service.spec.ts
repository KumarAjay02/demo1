import { TestBed } from '@angular/core/testing';

import { VehiclemstService } from './vehiclemst.service';

describe('VehiclemstService', () => {
  let service: VehiclemstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclemstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
