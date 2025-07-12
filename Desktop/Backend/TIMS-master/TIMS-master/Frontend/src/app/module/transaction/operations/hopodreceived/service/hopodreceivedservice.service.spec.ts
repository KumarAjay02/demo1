import { TestBed } from '@angular/core/testing';

import { HopodreceivedserviceService } from './hopodreceivedservice.service';

describe('HopodreceivedserviceService', () => {
  let service: HopodreceivedserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HopodreceivedserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
