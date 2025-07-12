import { TestBed } from '@angular/core/testing';

import { VehicleratemstService } from './vehicleratemst.service';

describe('VehicleratemstService', () => {
  let service: VehicleratemstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleratemstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
