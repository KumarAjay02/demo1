import { TestBed } from '@angular/core/testing';

import { StationaryRecieveServicesService } from './stationary-recieve-services.service';

describe('StationaryRecieveServicesService', () => {
  let service: StationaryRecieveServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationaryRecieveServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
