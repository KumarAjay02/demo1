import { TestBed } from '@angular/core/testing';

import { PincodemstService } from './pincodemst.service';

describe('PincodemstService', () => {
  let service: PincodemstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PincodemstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
