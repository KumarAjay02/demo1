import { TestBed } from '@angular/core/testing';

import { VehicleCapacityMasterService } from './vehicle-capacity-master.service';

describe('VehicleCapacityMasterService', () => {
  let service: VehicleCapacityMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleCapacityMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
