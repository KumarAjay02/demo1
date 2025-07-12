import { TestBed } from '@angular/core/testing';

import { VehicletrackingmstService } from './vehicletrackingmst.service';

describe('VehicletrackingmstService', () => {
  let service: VehicletrackingmstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicletrackingmstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
